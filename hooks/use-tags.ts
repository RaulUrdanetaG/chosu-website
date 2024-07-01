import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useTags() {
  const { tags, setTags } = useStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    async function getTags() {
      const currentTags = await axios.get("/api/tags");
      setTags(currentTags.data);
    }
    getTags();
  }, [setTags]);

  function resetTags() {
    setSelectedTags([]);
  }

  return { tags, selectedTags, setSelectedTags, resetTags };
}
