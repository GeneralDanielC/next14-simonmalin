"use client";

import { EditGuestModal } from "@/components/modals/edit-guest-modal";
import { PartyWithGuests } from "@/types";
import { Gift, Guest } from "@prisma/client";
import { useEffect, useState } from "react";
import { EditGiftModal } from "../modals/edit-gift-modal";
import { RequestGiftModal } from "../modals/request-gift-modal";

interface ModalProviderProps {
    party?: PartyWithGuests,
    guest?: Guest,
    gift?: Gift,
    requestGift?: Gift,
}

export const ModalProvider = ({
    party,
    guest,
    gift,
    requestGift,
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
            {requestGift && <RequestGiftModal gift={requestGift} />}
        </>
    )

}