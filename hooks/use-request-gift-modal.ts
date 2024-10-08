import { create } from "zustand";

type RequestGiftModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useRequestGiftModal = create<RequestGiftModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));