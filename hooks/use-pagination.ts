import { paginationType } from "@/types";
import { useEffect, useState } from "react";
import { useFilters } from "./use-filter";

export function usePagination({ pagination }: { pagination: paginationType }) {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { filters, setFilter } = useFilters([{ key: "page" }]);

  useEffect(() => {
    const totalPages = Math.ceil(
      pagination.itemsCount / pagination.paginationBatch
    );
    const currentPage = Number(filters.page);

    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }, [pagination.itemsCount, pagination.paginationBatch, filters]);

  function goToPage(page: number) {
    setFilter("page", page.toString());
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setFilter("page", (Number(filters.page) + 1).toString());
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setFilter("page", (Number(filters.page) - 1).toString());
    }
  }

  return { totalPages, currentPage, nextPage, prevPage, goToPage };
}
