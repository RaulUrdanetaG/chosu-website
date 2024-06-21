"use client";

import { cn } from "@/lib/utils";
import { Archive, Home, Link, ReceiptText } from "lucide-react";
import { usePathname } from "next/navigation";

const adminLinks = [
  { name: "Inicio", href: "/admin/home", icon: Home },
  { name: "Ordenes", href: "/admin/orders", icon: ReceiptText },
  { name: "Productos", href: "/admin/items", icon: Archive },
];

export default function AdminLinks() {
  const pathName = usePathname();
  return (
    <>
      {adminLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": link.href === pathName }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
