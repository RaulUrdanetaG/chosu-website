import { currentProfile } from "@/lib/current-profile";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileButton from "@/components/header/profile-button";
import NavigationMenu from "@/components/header/navigation-menu";
import { MobileToggleHeader } from "@/components/header/mobile-toggle";

export default async function Header() {
  const profile = await currentProfile();

  return (
    <header className="flex justify-between items-center py-4 px-10 bg-primary">
      <div className="order-2 md:order-1 flex items-center">
        <Image
          src="/assets/chosu-logo-no-bg.webp"
          alt="Logo de chosu venta de garaje"
          width={100}
          height={100}
        />
      </div>

      <div className="hidden order-2 md:flex-1 md:flex justify-center">
        <NavigationMenu />
      </div>
      <div className="flex justify-center items-center order-1 w-[75px] md:hidden">
        <MobileToggleHeader />
      </div>

      <div className="order-3 w-[75px] flex justify-center">
        {profile ? (
          <ProfileButton profile={profile} />
        ) : (
          <Link href="/sign-up">
            <Button className="bg-secondary w-[75px]">Ingresar</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
