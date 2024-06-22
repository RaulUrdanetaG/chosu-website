import { checkAdmin } from "@/lib/check-admin";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const admin = await checkAdmin();
  if (!admin) return redirect("/home");

  return <div>Orders Page</div>;
}
