import ItemsHeader from "@/components/admin-dashboard/items/items-header";
import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await checkAdmin();
  if (!admin) return redirect("/home");

  const locations = await db.location.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const owners = await db.owner.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const tags = await db.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="flex flex-col flex-1">
      <ItemsHeader locations={locations} tags={tags} owners={owners} />
      {children}
    </section>
  );
}
