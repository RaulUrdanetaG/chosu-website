"use client";

import { cn } from "@/lib/utils";
import { Archive, Home, ReceiptText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { name: "Inicio", href: "/admin/home", icon: Home },
  { name: "Pedidos", href: "/admin/orders", icon: ReceiptText },
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
              "flex h-[48px] grow items-center gap-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-dash_primary/30 hover:text-dash_text flex-none justify-start p-2 px-3 mt-3",
              { "bg-dash_primary/30 text-dash_text": link.href === pathName }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
