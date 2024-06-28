import { Owner, Tag, Location } from "@prisma/client";
import { create } from "zustand";

type Store = {
  tags: Tag[];
  owners: Owner[];
  locations: Location[];
  setTags: (tags: Tag[]) => void;
  setOwners: (owners: Owner[]) => void;
  setLocations: (locations: Location[]) => void;
};

export const useStore = create<Store>((set) => ({
  tags: [],
  owners: [],
  locations: [],

  setTags: (tags) => set({ tags }),
  setOwners: (owners) => set({ owners }),
  setLocations: (locations) => set({ locations }),
}));
