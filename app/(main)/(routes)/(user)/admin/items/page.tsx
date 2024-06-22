import { checkAdmin } from "@/lib/check-admin";
import { redirect } from "next/navigation";

export default async function ItemsPage() {
  const admin = await checkAdmin();
  if (!admin) return redirect("/home");

  return <div>Items Page</div>;
}
