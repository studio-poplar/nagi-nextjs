import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "nagi_admin_session";

function sessionToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return crypto.createHash("sha256").update(`nagi-admin:${password}`).digest("hex");
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE);
  return cookie?.value === sessionToken();
}
