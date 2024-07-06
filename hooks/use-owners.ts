import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useOwners() {
  const { owners, setOwners } = useStore();
  const [selectedOwner, setSelectedOwner] = useState<string>("");

  useEffect(() => {
    async function getOwners() {
      const currentOwners = await axios.get("/api/owners");
      setOwners(currentOwners.data);
    }
    getOwners();
  }, [setOwners]);

  function resetOwner() {
    setSelectedOwner("");
  }

  return { owners, selectedOwner, setSelectedOwner, resetOwner };
}
