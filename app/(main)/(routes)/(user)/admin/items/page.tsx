"use client";

import DashItem from "@/components/admin-dashboard/items/dash-item";
import { DashItemSkeletonGrid } from "@/components/admin-dashboard/items/dash-item-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashItemType } from "@/types";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  const searchParams = useSearchParams();

  const [currentItems, setCurrentItems] = useState<DashItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      setIsLoading(true);
      const items = await axios.get(`/api/items?${searchParams.toString()}`);
      setCurrentItems(items.data);
      setIsLoading(false);
    }
    getItems();
  }, [searchParams]);

  return (
    <ScrollArea className="flex flex-col flex-1">
      {isLoading ? (
        <DashItemSkeletonGrid />
      ) : (
        <div>
          {currentItems.length > 0 ? (
            <div className="items-grid">
              {currentItems.map((item) => (
                <DashItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div>no hay productos</div>
          )}
        </div>
      )}
    </ScrollArea>
  );
}
