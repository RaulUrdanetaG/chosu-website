import ItemsHeader from "@/components/admin-dashboard/items/items-header";
import { checkAdmin } from "@/lib/check-admin";
import { redirect } from "next/navigation";

export default async function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await checkAdmin();
  if (!admin) return redirect("/home");

  return (
    <section className="flex flex-col flex-1">
      <ItemsHeader />
      {children}
    </section>
  );
}
