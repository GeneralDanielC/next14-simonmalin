"use client";

import { EditGuestModal } from "@/components/modals/edit-guest-modal";
import { PartyWithGuests } from "@/types";
import { Gift, Guest } from "@prisma/client";
import { useEffect, useState } from "react";
import { EditGiftModal } from "../modals/edit-gift-modal";

interface ModalProviderProps {
    party?: PartyWithGuests,
    guest?: Guest,
    gift?: Gift,
}

export const ModalProvider = ({
    party,
    guest,
    gift,
}: ModalProviderProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {party && guest && <EditGuestModal guest={guest} party={party} />}
            {gift && <EditGiftModal gift={gift} />}
        </>
    )

}