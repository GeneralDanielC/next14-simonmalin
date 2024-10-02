import { create } from "zustand";

type EditGiftModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEditGiftModal = create<EditGiftModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));