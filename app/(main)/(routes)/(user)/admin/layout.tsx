import AdminSidebar from "@/components/admin-dashboard/admin-sidebar";
import { MobileToggleAdmin } from "@/components/admin-dashboard/mobile-toggle";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full md:flex-row">
      <div className="flex md:hidden">
        <MobileToggleAdmin />
      </div>
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      {children}
    </section>
  );
}
