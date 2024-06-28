import { useEffect } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useOwners() {
  const { owners, setOwners } = useStore();

  useEffect(() => {
    async function getOwners() {
      const currentOwners = await axios.get("/api/owners");
      setOwners(currentOwners.data);
    }
    getOwners();
  }, [setOwners]);

  return { owners };
}
