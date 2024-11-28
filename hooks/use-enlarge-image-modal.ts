import { create } from "zustand";

type EnlargeImageModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEnlargeImageModal = create<EnlargeImageModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));