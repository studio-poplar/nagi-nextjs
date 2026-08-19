import { NextResponse } from "next/server";
import { changePassword, checkPassword, isAuthenticated } from "@/lib/auth";
import { errorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (typeof currentPassword !== "string" || !checkPassword(currentPassword)) {
    return NextResponse.json({ error: "現在のパスワードが違います" }, { status: 401 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ error: "新しいパスワードは8文字以上にしてください" }, { status: 400 });
  }

  try {
    await changePassword(newPassword);
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
