import { useEffect } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useLocations() {
  const { tags, setTags } = useStore();

  useEffect(() => {
    async function getLocations() {
      const currentTags = await axios.get("/api/tags");
      setTags(currentTags.data);
    }
    getLocations();
  }, [setTags]);

  return { tags };
}
