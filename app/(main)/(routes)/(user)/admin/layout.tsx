import AdminSidebar from "@/components/admin-dashboard/admin-sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full md:flex-row">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      {children}
    </section>
  );
}
