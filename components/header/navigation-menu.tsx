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
    <nav className="flex flex-col bg-primary flex-1 p-5 pt-12 md:p-0 md:flex-none md:flex-row gap-4 md:gap-12 md:w-auto w-full">
      {navigationLinks.map((link, i) => {
        return (
          <div key={link.name}>
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "hidden md:block text-black/50 hover:text-black transition",
                {
                  "text-black": link.href === pathName,
                }
              )}
            >
              <p className="block">{link.name}</p>
            </Link>
            <a
              key={i}
              href={link.href}
              className={cn(
                "block md:hidden text-black/50 hover:text-black transition",
                {
                  "text-black bg-secondary rounded-md": link.href === pathName,
                }
              )}
            >
              <p className="block p-2">{link.name}</p>
            </a>
          </div>
        );
      })}
    </nav>
  );
}
