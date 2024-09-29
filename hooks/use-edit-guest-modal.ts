import { create } from "zustand";

type EditGuestModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEditGuestModal = create<EditGuestModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));