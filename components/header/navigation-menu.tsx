"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const navigationList = [
  { name: "Inicio", ref: "/home" },
  { name: "Tienda", ref: "/shop" },
  { name: "Sobre Nosotros", ref: "/about-us" },
  { name: "Contacto", ref: "/contact" },
];

export default function NavigationMenu() {
  const [currentPage, setCurrentPage] = useState("Inicio");

  return (
    <nav>
      <ul className="flex gap-12 list-none">
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
      </ul>
    </nav>
  );
}
