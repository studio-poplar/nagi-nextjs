import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";
import { getImageSlots } from "@/lib/images";
import { isAuthenticated } from "@/lib/auth";
import AdminClient from "@/components/admin/AdminClient";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "管理画面" };

// The auth check reads a per-request cookie, so this route must never be
// statically cached — otherwise every visitor would get whichever
// authenticated/unauthenticated state happened to be baked in at build time.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <LoginForm />;
  }

  const data = getSiteData();
  const slots = getImageSlots(data);

  return <AdminClient initialData={data} initialSlots={slots} />;
}
