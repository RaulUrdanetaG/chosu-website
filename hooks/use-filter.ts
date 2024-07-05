import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import { useDebounce } from "use-debounce";

export function useFilter() {
  const { filter, setFilter, resetFilter } = useStore();

  const [filterText, setFilterText] = useState("");
  const [filterValue] = useDebounce(filterText, 300);

  function handleInputFilter(e: any) {
    setFilterText(e.target.value);
  }

  useEffect(() => {
    setFilter({ query: filterValue });
  }, [filterValue, setFilter]);

  return { filter, handleInputFilter, resetFilter };
}
