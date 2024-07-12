"use client";

import DashItem from "@/components/admin-dashboard/items/dash-item";
import { DashItemSkeletonGrid } from "@/components/admin-dashboard/items/dash-item-skeleton";
import ItemsPagination from "@/components/Pagination";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal";
import { DashItemType, paginationType } from "@/types";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const { isOpen } = useModal();

  const [currentItems, setCurrentItems] = useState<DashItemType[]>([]);

  const [pagination, setPagination] = useState<paginationType>({
    itemsCount: 0,
    paginationBatch: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      setIsLoading(true);
      const { data } = await axios.get(`/api/items?${searchParams.toString()}`);
      setCurrentItems(data.items);
      setPagination({
        itemsCount: data.itemsCount,
        paginationBatch: data.paginationBatch,
      });
      setIsLoading(false);
    }
    if (!isOpen) {
      getItems();
    }
  }, [isOpen, searchParams]);

  return (
    <ScrollArea className="flex flex-col flex-1 justify-center items-center">
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
            <div className="flex flex-1 justify-center items-center px-5 md:px-10 mx-auto md:max-w-[350px] mt-[250px] text-center">
              <p className="flex justify-center items-center text-4xl mx-auto text-dash_text text-center">
                No hay articulos con estas caracteristicas!
              </p>
            </div>
          )}
        </div>
      )}
      {currentItems.length > 0 && <ItemsPagination pagination={pagination} />}
    </ScrollArea>
  );
}
