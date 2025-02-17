"use client";

import { EditGuestModal } from "@/components/modals/edit-guest-modal";
import { GiftWithAssignments, PartyWithGuests } from "@/types";
import { Gift, Guest } from "@prisma/client";
import { useEffect, useState } from "react";
import { EditGiftModal } from "../modals/edit-gift-modal";
import { RequestGiftModal } from "../modals/request-gift-modal";
import { EnlargeImageModal } from "../modals/enlarge-image-modal";
import { AddressCardDetails, AddressModal } from "../modals/address-modal";

interface ModalProviderProps {
    party?: PartyWithGuests,
    guest?: Guest,
    gift?: GiftWithAssignments,
    requestGift?: GiftWithAssignments,
    imageUrl?: string
    addressCardDetails?: AddressCardDetails
}

export const ModalProvider = ({
    party,
    guest,
    gift,
    requestGift,
    imageUrl,
    addressCardDetails,
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
            {imageUrl && <EnlargeImageModal imageUrl={imageUrl} />}
            {addressCardDetails && <AddressModal addressCardDetails={addressCardDetails} />}
        </>
    )

}