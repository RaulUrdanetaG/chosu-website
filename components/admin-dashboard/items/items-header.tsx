"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilter } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";

export default function ItemsHeader() {
  const { onOpen } = useModal();
  const { filter, handleInputFilter } = useFilter();

  return (
    <div className="flex ">
      <Input defaultValue={filter.query} onChange={handleInputFilter} />
      <p>Context value:{filter.query}</p>
      <Button onClick={() => onOpen("createItem", undefined)}>
        Agregar producto
      </Button>
    </div>
  );
}
