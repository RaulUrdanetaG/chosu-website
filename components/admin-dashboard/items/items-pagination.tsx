"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { paginationType } from "@/types";

export default function ItemsPagination({
  pagination,
}: {
  pagination: paginationType;
}) {
  const { totalPages, currentPage, nextPage, prevPage, goToPage } =
    usePagination({
      pagination,
    });

  const renderPaginationItems = () => {
    let items = [];

    const createPaginationItem = (page: number) => (
      <PaginationItem
        key={page}
        onClick={() => goToPage(page)}
        className={cn(
          "hover:cursor-pointer px-2 rounded-md hover:bg-gray-100",
          currentPage === page && "bg-gray-100"
        )}
      >
        {page}
      </PaginationItem>
    );

    if (currentPage < 5) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        items.push(createPaginationItem(i));
      }
      if (totalPages > 5) {
        items.push(
          <div className="flex items-center" key="start">
            <PaginationEllipsis />
            {createPaginationItem(totalPages)}
          </div>
        );
      }
    } else if (currentPage >= 5 && currentPage < totalPages - 4) {
      items.push(
        <div className="flex items-center" key="start">
          {createPaginationItem(1)}
          <PaginationEllipsis />
        </div>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        items.push(createPaginationItem(i));
      }
      items.push(
        <div className="flex items-center" key="end">
          <PaginationEllipsis />
          {createPaginationItem(totalPages)}
        </div>
      );
    } else {
      if (totalPages > 5) {
        items.push(
          <div className="flex items-center" key="start">
            {createPaginationItem(1)}
            <PaginationEllipsis />
          </div>
        );
      }
      for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) {
        items.push(createPaginationItem(i));
      }
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`p-2 hover:cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={currentPage > 1 ? prevPage : undefined}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            className={`p-2 hover:cursor-pointer ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={currentPage < totalPages ? nextPage : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
