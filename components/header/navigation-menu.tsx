"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { name: "Inicio", href: "/home" },
  { name: "Tienda", href: "/shop" },
  { name: "Sobre Nosotros", href: "/about-us" },
  { name: "Contacto", href: "/contact" },
];

export default function NavigationMenu() {
  const pathName = usePathname();

  return (
    <nav className="flex gap-12">
      {/* <ul className="flex gap-12 list-none">
        {navigationList.map((NavigationItem, i) => (
          <li
            className={cn(
              "text-black/50 hover:text-black transition",
              currentPage === NavigationItem.name && "text-black"
            )}
            key={i}
          >
            <Link
              href={NavigationItem.ref}
              onClick={() => setCurrentPage(NavigationItem.name)}
            >
              <p>{NavigationItem.name}</p>
            </Link>
          </li>
        ))}
      </ul> */}

      {navigationLinks.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn("text-black/50 hover:text-black transition", {
              "text-black": link.href === pathName,
            })}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
