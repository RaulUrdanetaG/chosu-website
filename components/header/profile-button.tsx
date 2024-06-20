import { User } from "@prisma/client";
import UserAvatar from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  LogOut,
  MapPin,
  Settings,
  ShoppingCart,
  UserCog,
  User as UserIcon,
} from "lucide-react";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

interface ProfileButtonProps {
  profile: User;
}

export default function ProfileButton({ profile }: ProfileButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <UserAvatar src={profile?.imageUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-9">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profile.role === "ADMIN" && (
          <DropdownMenuGroup>
            <Link href="/admin">
              <DropdownMenuItem className="hover:cursor-pointer">
                <div className="flex items-center justify-center">
                  <UserCog className="w-4 h-4 mr-2" /> <span>Administrar</span>
                </div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          <Link href={`/user/${profile.userId}`}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <UserIcon className="w-4 h-4 mr-2" /> <span>Perfil</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href={`/user/${profile.userId}/addresses`}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" /> <span>Direcciones</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href={`/user/${profile.userId}/payment-methods`}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <CreditCard className="w-4 h-4 mr-2" />{" "}
                <span>Medios de pago</span>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/cart/${profile.userId}`}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" /> <span>Carrito</span>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/user/${profile.userId}`}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <Settings className="w-4 h-4 mr-2" /> <span>Ajustes</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <SignOutButton redirectUrl="/home">
            <DropdownMenuItem className="hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <LogOut className="w-4 h-4 mr-2" /> <span>Salir</span>
              </div>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
