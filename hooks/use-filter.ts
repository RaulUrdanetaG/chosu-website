import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Filters = {
  [key: string]: string | string[];
};

export function useFilters(filterKeys: { key: string; isArray?: boolean }[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({});
  const prevSearchParams = useRef<string | null>(null);

  useEffect(() => {
    const paramsString = searchParams.toString();
    if (prevSearchParams.current === paramsString) return;
    prevSearchParams.current = paramsString;

    const newFilters: Filters = {};
    filterKeys.forEach(({ key, isArray }) => {
      const values = searchParams.get(key) || "";
      newFilters[key] = isArray
        ? values
          ? values.split(",")
          : []
        : values || "";
    });
    setFilters(newFilters);
  }, [searchParams, filterKeys]);

  const setFilter = useCallback(
    (key: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        } else {
          params.delete(key);
        }
      } else {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      router.push(`${pathname}?${params.toString()}`);
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    },
    [router, pathname, searchParams]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname);
    setFilters(
      filterKeys.reduce((acc, { key }) => ({ ...acc, [key]: "" }), {})
    );
  }, [router, pathname, filterKeys]);

  return { filters, setFilter, resetFilters };
}
