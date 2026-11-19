import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function getSecret() {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "dev-secret";
  return new TextEncoder().encode(secret);
}

export function verifyPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD || "change_me";
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
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
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
