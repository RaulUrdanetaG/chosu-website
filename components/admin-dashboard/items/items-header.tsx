"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";
import { MobileToggleAdmin } from "../mobile-toggle";
import { Plus, Search } from "lucide-react";

import LocationSelector from "@/components/admin-dashboard/location-selector";
import TagSelector from "@/components/admin-dashboard/tag-selector";
import OwnerSelector from "@/components/admin-dashboard/owner-selector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/hooks/use-store";
import { Location, Owner, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface ItemsHeaderProps {
  tags: Tag[];
  locations: Location[];
  owners: Owner[];
}

export default function ItemsHeader({
  tags,
  locations,
  owners,
}: ItemsHeaderProps) {
  const { onOpen } = useModal();

  const { setLocations, setTags, setOwners } = useStore();
  const { filters, setFilter, resetFilters } = useFilters([
    { key: "q" },
    { key: "o" },
    { key: "l" },
    { key: "t", isArray: true },
  ]); //query, owner, location, tags

  useEffect(() => {
    setLocations(locations);
    setTags(tags);
    setOwners(owners);
  }, [locations, tags, owners, setLocations, setTags, setOwners]);

  const [queryFilter, setQueryFilter] = useState("");
  const [filterQuery] = useDebounce(queryFilter, 300);

  function handleQueryChange(filter: string) {
    setQueryFilter(filter);
  }
  useEffect(() => {
    setFilter("q", filterQuery);
  }, [filterQuery, setFilter]);

  function handleOwnerChange(filter: string) {
    setFilter("o", filter);
  }

  function handleTagsChange(filter: string[]) {
    console.log(filter);
    setFilter("t", filter);
  }

  function handleLocationChange(filter: string) {
    setFilter("l", filter);
  }

  return (
    <div className="flex items-end justify-between py-4 px-2 bg-dash_primary/50">
      <div className="flex md:hidden">
        <MobileToggleAdmin />
      </div>
      <div className="flex">
        <Sheet>
          <SheetTrigger asChild>
            <a className=" p-1 rounded-md bg-zinc-100 hover:cursor-pointer">
              <Search className="w-7 h-7 text-dash_text" />
            </a>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex flex-col md:flex-row justify-between items-center md:items-end py-5"
          >
            <SheetHeader>
              <SheetTitle>Filtrado</SheetTitle>
              <SheetDescription>
                Filtros para la búsqueda de productos
              </SheetDescription>
            </SheetHeader>
            <div className="flex gap-1">
              <OwnerSelector
                selectedOwner={filters.o as string}
                owners={owners}
                handleGroupChange={handleOwnerChange}
                type="name"
                add={false}
              />
              <TagSelector
                selectedTags={filters.t as string[]}
                tags={tags}
                handleGroupChange={handleTagsChange}
                type="name"
                add={false}
              />
              <LocationSelector
                selectedLocation={filters.l as string}
                locations={locations}
                handleGroupChange={handleLocationChange}
                type="name"
                add={false}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px]">Buscar:</p>
              <Input
                className="bg-zinc-100 h-9 max-w-[200px]"
                defaultValue={filters.q}
                onChange={(e) => handleQueryChange(e.target.value)}
              />
            </div>
            <a
              className="flex w-[200px] items-center justify-center md:hidden bg-[#EF6F6C] rounded-md py-1 hover:cursor-pointer"
              onClick={resetFilters}
            >
              Limpiar filtros
            </a>
          </SheetContent>
        </Sheet>
        <a
          className="hidden md:flex ml-2 items-center justify-center bg-[#EF6F6C] rounded-md p-1 px-2 text-[13px] hover:cursor-pointer"
          onClick={resetFilters}
        >
          Limpiar filtros
        </a>
      </div>
      <div className="flex gap-1 items-center">
        <Button size="sm" onClick={() => onOpen("createItem")}>
          <p className="hidden md:block">Agregar</p>{" "}
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
