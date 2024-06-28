import { useEffect } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useLocations() {
  const { locations, setLocations } = useStore();

  useEffect(() => {
    async function getLocations() {
      const currentLocations = await axios.get("/api/locations");
      setLocations(currentLocations.data);
    }
    getLocations();
  }, [setLocations]);

  return { locations };
}
