import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { putFile } from "./github";

export const SESSION_COOKIE = "nagi_admin_session";
const AUTH_JSON_PATH = path.join(process.cwd(), "content", "auth.json");

function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/** Reads content/auth.json if the password has ever been changed through the
 * admin panel. Absent by default — ADMIN_PASSWORD is the bootstrap credential. */
function storedPasswordHash(): string | null {
  try {
    const raw = fs.readFileSync(AUTH_JSON_PATH, "utf-8");
    const data = JSON.parse(raw) as { passwordHash?: string };
    return data.passwordHash ?? null;
  } catch {
    return null;
  }
}

/** The hash actually in effect right now: a panel-set password overrides the
 * env var once one has ever been committed. */
function effectivePasswordHash(): string | null {
  const stored = storedPasswordHash();
  if (stored) return stored;
  const envPassword = process.env.ADMIN_PASSWORD;
  return envPassword ? sha256(envPassword) : null;
}

function sessionToken(): string {
  return sha256(`nagi-admin-session:${effectivePasswordHash() ?? ""}`);
}

export function checkPassword(password: string): boolean {
  const expected = effectivePasswordHash();
  if (!expected) return false;
  const a = Buffer.from(sha256(password));
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
  if (!effectivePasswordHash()) return false;
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE);
  return cookie?.value === sessionToken();
}

/** Commits the new password hash to GitHub. Vercel's production filesystem is
 * read-only, so this can't be a local fs.writeFileSync — like other admin
 * saves, it takes ~30-60s to actually go live via the triggered redeploy. */
export async function changePassword(newPassword: string): Promise<void> {
  const hash = sha256(newPassword);
  await putFile(
    "content/auth.json",
    JSON.stringify({ passwordHash: hash }, null, 2) + "\n",
    "chore: change admin panel password via admin panel"
  );
}
