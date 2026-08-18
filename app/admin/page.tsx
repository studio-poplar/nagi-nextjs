import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";
import { getImageSlots } from "@/lib/images";
import AdminClient from "@/components/admin/AdminClient";

export const metadata: Metadata = { title: "管理画面" };

export default function AdminPage() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className="wrap" style={{ paddingBlock: 80, textAlign: "center" }}>
        <p className="lead">
          管理画面はローカル開発環境（<code>npm run dev</code>）でのみ利用できます。
        </p>
      </div>
    );
  }

  const data = getSiteData();
  const slots = getImageSlots(data);

  return <AdminClient initialData={data} initialSlots={slots} />;
}
