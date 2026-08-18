import { NextResponse } from "next/server";
import { checkPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };

  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "パスワードが違います" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
