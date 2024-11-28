"use client";

import { AddressCardDetails } from "@/components/modals/address-modal";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Separator } from "@/components/ui/separator";
import { useAddressModal } from "@/hooks/use-enlarge-image-modal copy";
import { useState } from "react";

interface TimelineProps {
    items: AddressCardDetails[]
}

export const Timeline = ({
    items,
}: TimelineProps) => {
    const [addressCardDetails, setAddressCardDetails] = useState<AddressCardDetails | undefined>();

    return (
        <div className="flex flex-col h-full gap-y-3">
            {items.map((item, index) => (
                <div key={index}>
                    <TimelineItem item={item} setAddressCardDetails={setAddressCardDetails} />
                </div>
            ))}
            <ModalProvider
                addressCardDetails={addressCardDetails}
            />
        </div>
    )
}

const TimelineItem = ({
    item,
    setAddressCardDetails,
}: {
    item: AddressCardDetails,
    setAddressCardDetails: React.Dispatch<React.SetStateAction<AddressCardDetails | undefined>>
}) => {
    const addressModal = useAddressModal();

    const handleOnClick = () => {
        setAddressCardDetails(item);
        addressModal.onOpen();
    }

    return (
        <div onClick={handleOnClick}>
            <div className="flex flex-row h-full gap-x-4 hover:cursor-pointer">
                {/* Left */}
                <div className="flex flex-col h-full justify-center items-center gap-y-2">
                    <div className="size-5 rounded-full border border-black"></div>
                    <Separator orientation="vertical" className="h-[55px] bg-black" />
                </div>
                {/* Right */}
                <div className="flex flex-col h-full">
                    <span className="text-stone-500">{item.time}</span>
                    <h2 className="text-2xl">{item.heading}</h2>
                    <h3>{item.description}</h3>
                </div>
            </div>

        </div>
    )
}