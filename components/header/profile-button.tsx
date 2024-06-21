"use client";

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

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
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
import { useState } from "react";

interface ProfileButtonProps {
  profile: User;
}

export default function ProfileButton({ profile }: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 px-0">
          <UserAvatar src={profile?.imageUrl} />
          <div className="absolute top-7 right-0 bg-[#CA2E55] rounded-full">
            <ChevronDown
              className={`text-white w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-3 py-2 mt-1">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profile.role === "ADMIN" && (
          <DropdownMenuGroup>
            <Link href="/admin/home">
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
