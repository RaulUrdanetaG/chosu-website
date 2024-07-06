"use client";

import { useFilter } from "@/hooks/use-filter";
import { Item } from "@prisma/client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  // const { filter } = useFilter();
  const searchParams = useSearchParams();

  // const [currentItems, setCurrentItems] = useState<Item[]>([]);

  useEffect(() => {
    async function getItems() {
      await axios.get(`/api/items?${searchParams.toString()}`);
    }
    getItems();
  }, [searchParams]);

  return <section className="flex flex-col flex-1"></section>;
}
