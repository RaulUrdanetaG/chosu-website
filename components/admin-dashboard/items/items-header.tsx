"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilter } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";
import { MobileToggleAdmin } from "../mobile-toggle";
import { Plus, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocations } from "@/hooks/use-locations";
import { useTags } from "@/hooks/use-tags";
import { useEffect } from "react";
import { useOwners } from "@/hooks/use-owners";

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

export default function ItemsHeader() {
  const { onOpen } = useModal();
  const searchParams = useSearchParams();

  const { locations, selectedLocation, setSelectedLocation } = useLocations();
  const { tags, selectedTags, setSelectedTags } = useTags();
  const { owners, selectedOwner, setSelectedOwner } = useOwners();

  const {
    setFilterText,
    setLocationFilter,
    setTagsFilter,
    setOwnerFilter,
    resetFilters,
  } = useFilter();

  useEffect(() => {
    setLocationFilter(selectedLocation);
    setTagsFilter(selectedTags);
    setOwnerFilter(selectedOwner);
  }, [
    selectedLocation,
    selectedTags,
    selectedOwner,
    setOwnerFilter,
    setLocationFilter,
    setTagsFilter,
  ]);

  function restoreFilters() {
    resetFilters();
    setSelectedLocation("");
    setSelectedOwner("");
    setSelectedTags([]);
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
                selectedOwner={selectedOwner}
                owners={owners}
                handleGroupChange={setSelectedOwner}
                type="name"
                add={false}
              />
              <TagSelector
                selectedTags={selectedTags}
                tags={tags}
                handleGroupChange={setSelectedTags}
                type="name"
                add={false}
              />
              <LocationSelector
                selectedLocation={selectedLocation}
                locations={locations}
                handleGroupChange={setSelectedLocation}
                type="name"
                add={false}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px]">Buscar:</p>
              <Input
                className="bg-zinc-100 h-9 max-w-[200px]"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <a
              className="flex w-[200px] items-center justify-center md:hidden bg-[#EF6F6C] rounded-md py-1"
              onClick={restoreFilters}
            >
              Limpiar filtros
            </a>
          </SheetContent>
        </Sheet>
        <a
          className="hidden md:flex ml-2 items-center justify-center bg-[#EF6F6C] rounded-md p-1 px-2 text-[13px]"
          onClick={restoreFilters}
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
