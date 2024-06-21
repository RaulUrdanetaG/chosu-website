import AdminSidebar from "@/components/admin-dashboard/admin-sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full ">
      <AdminSidebar />
      {children}
    </section>
  );
}
