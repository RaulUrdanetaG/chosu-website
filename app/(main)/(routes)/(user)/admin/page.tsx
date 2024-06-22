import { checkAdmin } from "@/lib/check-admin";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const admin = await checkAdmin();
  if (!admin) return redirect("/home");

  return redirect(`/admin/home`);
}
