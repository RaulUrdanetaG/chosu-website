import ItemsHeader from "@/components/admin-dashboard/items/items-header";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ItemsHeader />
      {children}
    </section>
  );
}
