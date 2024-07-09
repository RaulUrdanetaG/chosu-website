import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useOwners() {
  const { setOwners } = useStore();
  const [selectedOwner, setSelectedOwner] = useState<string>("");

  async function getOwners() {
    const currentOwners = await axios.get("/api/owners");
    setOwners(currentOwners.data);
  }

  function resetOwner() {
    setSelectedOwner("");
  }

  return { selectedOwner, setSelectedOwner, resetOwner };
}
