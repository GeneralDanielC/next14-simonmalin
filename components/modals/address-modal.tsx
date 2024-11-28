"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEnlargeImageModal } from "@/hooks/use-enlarge-image-modal";
import Image from "next/image";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Map } from "../map";
import Link from "next/link";
import { useAddressModal } from "@/hooks/use-enlarge-image-modal copy";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type MapSettings = {
    coordinates: [number, number]
    zoom?: number
}

export type AddressCardDetails = {
    time: string
    heading: string
    description: string
    street: string
    postalCode: string
    city: string
    mapSettings: MapSettings
}

interface AddressModalProps {
    addressCardDetails: AddressCardDetails
}

export const AddressModal = ({ addressCardDetails }: AddressModalProps) => {
    const addressModal = useAddressModal();

    return (
        <Dialog
            // open
            open={addressModal.isOpen}
            onOpenChange={addressModal.onClose}
        >
            <DialogContent className="min-h-[200px] max-w-[600px] p-8 bg-card-beige">
                <div className="flex flex-col gap-5">
                    <Map coordinates={addressCardDetails.mapSettings.coordinates} zoom={addressCardDetails.mapSettings.zoom} isGoogleCoordinates classNames="border border-black h-full" />
                    <DialogHeader className="space-y-0 flex flex-row justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-thin">{addressCardDetails.description}</DialogTitle>
                            <DialogDescription className="text-lg">{addressCardDetails.heading}</DialogDescription>
                        </div>
                        <span className="text-2xl">{addressCardDetails.time}</span>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-2 bg-beige border border-black rounded-lg p-3">
                        <div className="flex flex-col">
                            <span className="text-2xl">Adress</span>
                            <span className="text-stone-500">{addressCardDetails.street}</span>
                            <span className="text-stone-500">{addressCardDetails.postalCode} {addressCardDetails.city}</span>
                        </div>
                        <Button

                            asChild
                        >
                            <Link href={`https://maps.google.com/?q=${addressCardDetails.mapSettings.coordinates.toString()}`} target="_blank">
                                Öppna i kartor
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
