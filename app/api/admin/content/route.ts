import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/content";
import { safeExternalUrl } from "@/lib/safe-url";
import type { SiteContent } from "@/lib/types";

export const runtime = "nodejs";

function sanitizeContent(content: SiteContent): SiteContent {
  const primaryUrl = safeExternalUrl(content.contacts.primary.url);
  if (!primaryUrl) {
    throw new Error("Invalid primary contact URL");
  }
  content.contacts.primary.url = primaryUrl;

  if (content.contacts.secondary) {
    const secondaryUrl = safeExternalUrl(content.contacts.secondary.url);
    content.contacts.secondary = secondaryUrl
      ? { ...content.contacts.secondary, url: secondaryUrl }
      : null;
  }

  content.examples = content.examples.map((example) => ({
    ...example,
    link: example.link ? safeExternalUrl(example.link) || undefined : undefined,
  }));

  return content;
}

export async function GET() {
  if (!isAdminConfigured() || !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await readContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!isAdminConfigured() || !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const raw = form.get("content");
      if (typeof raw !== "string") {
        return NextResponse.json({ error: "Missing content" }, { status: 400 });
      }
      const content = sanitizeContent(JSON.parse(raw) as SiteContent);

      const examplesDir = path.join(process.cwd(), "public", "examples");
      await fs.mkdir(examplesDir, { recursive: true });

      const allowedExt = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
      const entries = Array.from(form.entries());
      for (const [key, value] of entries) {
        if (!key.startsWith("file:") || !(value instanceof File)) continue;
        const exampleId = key.replace("file:", "");
        if (!/^[a-zA-Z0-9_-]+$/.test(exampleId)) continue;
        const ext = (path.extname(value.name) || ".png").toLowerCase();
        if (!allowedExt.has(ext)) continue;
        const filename = `${exampleId}${ext}`;
        const target = path.join(examplesDir, filename);
        if (!target.startsWith(examplesDir)) continue;
        const buffer = Buffer.from(await value.arrayBuffer());
        if (buffer.byteLength > 8 * 1024 * 1024) continue;
        await fs.writeFile(target, buffer);
        const example = content.examples.find((item) => item.id === exampleId);
        if (example) {
          example.image = `/examples/${filename}`;
        }
      }

      await writeContent(content);
      return NextResponse.json({ ok: true, content });
    }

    const content = sanitizeContent((await request.json()) as SiteContent);
    await writeContent(content);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
