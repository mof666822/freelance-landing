import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "admin_session";
const SESSION_DAYS = 7;

const FORBIDDEN_PASSWORDS = new Set([
  "",
  "change_me",
  "password",
  "admin",
  "123456",
  "secret",
]);

export function isAdminConfigured() {
  const password = process.env.ADMIN_PASSWORD || "";
  const jwtSecret = process.env.JWT_SECRET || "";
  if (password.length < 12 || FORBIDDEN_PASSWORDS.has(password)) return false;
  if (jwtSecret.length < 32 || jwtSecret === "dev-secret") return false;
  if (jwtSecret === password) return false;
  return true;
}

function getSecret() {
  if (!isAdminConfigured()) {
    throw new Error("Admin credentials are not configured");
  }
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export function verifyPassword(input: string) {
  if (!isAdminConfigured()) return false;
  const expected = process.env.ADMIN_PASSWORD!;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    if (!isAdminConfigured()) return false;
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false;
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export function sessionCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}
