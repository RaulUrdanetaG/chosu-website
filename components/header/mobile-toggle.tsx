import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationMenu from "@/components/header/navigation-menu";

export function MobileToggleHeader() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <NavigationMenu />
      </SheetContent>
    </Sheet>
  );
}
