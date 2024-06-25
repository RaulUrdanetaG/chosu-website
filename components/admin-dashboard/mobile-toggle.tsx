import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./admin-sidebar";

export function MobileToggleAdmin() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0 m-0 gap-0">
        <SheetHeader>
          <SheetTitle className="text-start px-3 pt-4">
            Panel de administrador
          </SheetTitle>
        </SheetHeader>
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  );
}
