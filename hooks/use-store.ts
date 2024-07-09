import { Owner, Tag, Location } from "@prisma/client";
import { create } from "zustand";

type Store = {
  tags: Tag[];
  owners: Owner[];
  locations: Location[];
  page: number;
};

type Actions = {
  setTags: (tags: Tag[]) => void;
  setOwners: (owners: Owner[]) => void;
  setLocations: (locations: Location[]) => void;
  setPage: (page: number) => void;
};

export const useStore = create<Store & Actions>((set) => ({
  tags: [],
  owners: [],
  locations: [],
  page: 1,

  setTags: (tags) => set({ tags }),
  setOwners: (owners) => set({ owners }),
  setLocations: (locations) => set({ locations }),
  setPage: (page) => set({ page }),
}));
