"use client";

import { EditGuestModal } from "@/components/modals/edit-guest-modal";
import { PartyWithGuests } from "@/types";
import { Guest } from "@prisma/client";
import { useEffect, useState } from "react";

interface ModalProviderProps {
    party?: PartyWithGuests,
    guest?: Guest,
}

export const ModalProvider = ({
    party,
    guest
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
        </>
    )

}