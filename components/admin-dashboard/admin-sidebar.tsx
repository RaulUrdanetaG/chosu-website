"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import Image from "next/image";
import AdminLinks from "@/components/admin-dashboard/admin-links";

export default function AdminSidebar() {
  return (
    <section className="flex h-full flex-col flex-1 w-auto md:w-56 px-3 py-4 pt-0 md:pt-4 bg-white md:bg-gray-100">
      <Link
        href="/home"
        className="hidden md:flex items-center justify-center gap-2 mb-5 hover:cursor-pointer"
      >
        <Image
          src="/assets/chosu-logo-no-bg.webp"
          alt="Logo de chosu"
          width="140"
          height="140"
        />
      </Link>
      <div className="flex grow flex-col justify-between space-x-0 space-y-2">
        <AdminLinks />
        <div className=" h-auto w-full grow rounded-md bg-gray-100 block"></div>
        <Link href="/home" className="flex">
          <button className="flex h-[48px] grow items-center gap-2 rounded-md bg-gray-100 text-sm font-medium hover:bg-dash_primary/30 hover:text-dash_text flex-none justify-start p-2 px-3 mt-1">
            <LogOut className="w-6" />
            <div className="block">Salir</div>
          </button>
        </Link>
      </div>
    </section>
  );
}
