import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { defaultContent } from "@/lib/defaults";
import type { SiteContent } from "@/lib/types";

const CONTENT_PATH = path.join(process.cwd(), "content.json");

function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }
  if (typeof base !== "object" || base === null) {
    return (patch as T) ?? base;
  }
  const result: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  };
  if (typeof patch !== "object" || patch === null) return base;
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    if (key in result) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

export async function readContent(): Promise<SiteContent> {
  noStore();
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return deepMerge(defaultContent, parsed);
  } catch {
    return structuredClone(defaultContent);
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8");
}

export function resolveContacts(content: SiteContent) {
  const primary = content.contacts.primary;
  const secondary = content.contacts.secondary?.url
    ? content.contacts.secondary
    : {
        label: {
          ru: "Написать в ЛС",
          en: "Message in DMs",
        },
        url: primary.url,
      };

  return { primary, secondary };
}
