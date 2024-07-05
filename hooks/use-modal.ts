// import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

// TODO: add ModalData to match item, for edit item purposes

export type ModalType =
  | "createItem"

interface ModalData {
  apiUrl?: string;
  query?: Record<string, any>;
  message?: {
    name: string;
    content: string;
    imageUrl: string;
    timestamp: string;
    isImage: string | false | null;
    isPdf: string | false | null;
    fileUrl?: string | null;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
