import { currentProfile } from "@/lib/current-profiel";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import NavigationMenu from "@/components/header/navigation-menu";
import Image from "next/image";

export default async function Header() {
  const profile = await currentProfile();

  return (
    <header className="flex justify-between items-center p-4 bg-[#5A9367]">
      <div>
        {/* <Image src={}/> */}
        Logo chosu
      </div>

      <NavigationMenu />

      {profile ? (
        <UserAvatar src={profile.imageUrl} />
      ) : (
        <Button className="bg-[#5CAB7D]">Ingresar</Button>
      )}
    </header>
  );
}
