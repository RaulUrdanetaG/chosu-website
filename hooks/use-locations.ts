import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useLocations() {
  const { setLocations } = useStore();
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  async function getLocations() {
    const currentLocations = await axios.get("/api/locations");
    setLocations(currentLocations.data);
  }

  function resetLocation() {
    setSelectedLocation("");
  }

  return {
    selectedLocation,
    setSelectedLocation,
    resetLocation,
  };
}
