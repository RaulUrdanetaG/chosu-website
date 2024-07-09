import { useEffect, useState } from "react";
import { useStore } from "./use-store";
import axios from "axios";

export function useTags() {
  const { setTags } = useStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  async function getTags() {
    const currentTags = await axios.get("/api/tags");
    setTags(currentTags.data);
  }

  function resetTags() {
    setSelectedTags([]);
  }

  return {
    selectedTags,
    setSelectedTags,
    resetTags,
  };
}
