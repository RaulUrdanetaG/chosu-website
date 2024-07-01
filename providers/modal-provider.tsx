"use client";

import { useEffect, useState } from "react";

import AddItemModal from "@/components/modals/add-item-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddItemModal />
    </>
  );
}
