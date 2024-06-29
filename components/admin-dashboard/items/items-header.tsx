"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export default function ItemsHeader() {
  const { onOpen } = useModal();

  return (
    <div>
      <Button onClick={() => onOpen("createItem", undefined)}>
        Agregar producto
      </Button>
    </div>
  );
}
