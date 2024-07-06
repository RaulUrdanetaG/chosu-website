import { Owner, Tag, Location } from "@prisma/client";
import { create } from "zustand";

type Store = {
  tags: Tag[];
  owners: Owner[];
  locations: Location[];
  // filter: {
  //   query?: string;
  //   tags?: string[];
  //   owner?: string;
  //   location?: string;
  // };
};

type Actions = {
  setTags: (tags: Tag[]) => void;
  setOwners: (owners: Owner[]) => void;
  setLocations: (locations: Location[]) => void;
  // setFilter: (filter: {
  //   query?: string;
  //   tags?: string[];
  //   owner?: string;
  //   location?: string;
  // }) => void;
  // resetFilter: () => void;
};

export const useStore = create<Store & Actions>((set) => ({
  tags: [],
  owners: [],
  locations: [],
  // filter: {
  //   query: "",
  //   owner: "",
  //   location: "",
  //   tags: [],
  // },

  setTags: (tags) => set({ tags }),
  setOwners: (owners) => set({ owners }),
  setLocations: (locations) => set({ locations }),

  // setFilter: (filter) => set({ filter }),
  // resetFilter: () =>
  //   set({ filter: { query: "", tags: [], owner: "", location: "" } }),
}));
