import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useFilter() {
  // const { filter, setFilter, resetFilter } = useStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Name filter
  const [filterText, setFilterText] = useState("");
  const [filterValue] = useDebounce(filterText, 300);

  // Owner filter
  const [ownerFilter, setOwnerFilter] = useState("");

  // Location filter
  const [locationFilter, setLocationFilter] = useState("");

  // Tags filter
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  function resetFilters() {
    setFilterText("");

    setLocationFilter("");
    setOwnerFilter("");
    setTagsFilter([]);
  }

  useEffect(() => {
    function setSearchParams() {
      const params = new URLSearchParams(searchParams.toString());

      if (filterValue !== "") {
        params.set("q", filterValue);
      } else {
        params.delete("q");
      }

      if (ownerFilter !== "") {
        params.set("o", ownerFilter);
      } else {
        params.delete("o");
      }

      if (locationFilter !== "") {
        params.set("l", locationFilter);
      } else {
        params.delete("l");
      }

      if (tagsFilter.length > 0) {
        const tags = tagsFilter.join(" ");
        params.set("t", tags);
      } else {
        params.delete("t");
      }

      replace(`${pathname}?${params.toString()}`);
    }

    setSearchParams();
  }, [
    filterValue,
    pathname,
    replace,
    searchParams,
    ownerFilter,
    locationFilter,
    tagsFilter,
  ]);

  return {
    resetFilters,
    setFilterText,
    setOwnerFilter,
    setLocationFilter,
    setTagsFilter,
  };
}
