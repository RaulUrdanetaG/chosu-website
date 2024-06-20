import { currentProfile } from "@/lib/current-profiel";
import NavigationMenu from "@/components/header/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import ProfileButton from "@/components/header/profile-button";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const profile = await currentProfile();

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-[#5A9367]">
      <div className="flex items-center">
        <Image
          src="/assets/chosu-logo-no-bg.webp"
          alt="Logo de chosu venta de garaje"
          width={100}
          height={100}
        />
      </div>

      <div className="flex-1 flex justify-center">
        <NavigationMenu />
      </div>

      <div>
        {profile ? (
          <div className="flex items-center justify-center">
            <span className="text-sm">
              <p>Bienvenido</p> <strong>{profile.name?.split(" ", 1)}!</strong>
            </span>
            <ProfileButton profile={profile} />
          </div>
        ) : (
          <Link href="/sign-up">
            <Button className="bg-[#5CAB7D]">Ingresar</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
