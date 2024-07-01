import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useLocations() {
  const { locations, setLocations } = useStore();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    async function getLocations() {
      const currentLocations = await axios.get("/api/locations");
      setLocations(currentLocations.data);
    }
    getLocations();
  }, [setLocations]);

  function resetLocation() {
    setSelectedLocation("");
  }

  return { locations, selectedLocation, setSelectedLocation, resetLocation };
}
