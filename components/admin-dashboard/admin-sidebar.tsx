"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, Home, LogOut, ReceiptText } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const adminLinks = [
  { name: "Inicio", href: "/admin/home", icon: Home },
  { name: "Ordenes", href: "/admin/orders", icon: ReceiptText },
  { name: "Productos", href: "/admin/items", icon: Archive },
];

export default function AdminSidebar() {
  const pathName = usePathname();

  return (
    <section className="hidden md:flex h-full flex-col w-56 px-3 py-4 bg-gray-100">
      <Link
        href="/home"
        className="flex items-center justify-center gap-2 mb-5 hover:cursor-pointer"
      >
        <Image
          src="/assets/chosu-logo-no-bg.webp"
          alt="Logo de chosu"
          width={140}
          height={140}
        />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {adminLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-dash_primary/30 hover:text-dash_text md:flex-none md:justify-start md:p-2 md:px-3 mt-3",
                { "bg-dash_primary/30 text-dash_text": link.href === pathName }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <Link href="/home">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-dash_primary/30 hover:text-dash_text md:flex-none md:justify-start md:p-2 md:px-3">
            <LogOut className="w-6" />
            <div className="hidden md:block">Salir</div>
          </button>
        </Link>
      </div>
    </section>
  );
}
