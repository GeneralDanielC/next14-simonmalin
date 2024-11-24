"use client";

import { ModalProvider } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useRequestGiftModal } from "@/hooks/use-request-gift-modal";
import { Gift } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface RegistryListProps {
    gifts: Gift[]
}

const ITEMS_PER_PAGE = 5;

export const RegistryList = ({
    gifts,
}: RegistryListProps) => {
    const requestGiftModal = useRequestGiftModal();

    const [hideList, setHideList] = useState<boolean>(false);
    const [requestGift, setRequestGift] = useState<Gift | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredGifts = gifts.filter(gift => !gift.assignedToEmail);

    const totalPages = Math.ceil(filteredGifts.length / ITEMS_PER_PAGE);

    // Get the current gifts to display based on pagination
    const currentGifts = filteredGifts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleOpenModal = (gift: Gift) => {
        setRequestGift(gift);
        requestGiftModal.onOpen();
    }

    if (hideList) {
        return (
            <div className="w-full h-full min-h-[125px] flex flex-col items-center justify-center">
                <h2 className="text-xl">Inga saker här ännu</h2>
                <span className="text-stone-500">Återkom lite senare</span>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-y-0.5">
                {currentGifts.map(gift => (
                    <div onClick={() => handleOpenModal(gift)} key={gift.id} className="flex flex-col p-1 rounded-lg hover:cursor-pointer hover:bg-stone-500/10">
                        <span>{gift.title}</span>
                        <span className="text-xs text-stone-500/90">{gift.backstory}</span>
                        <Separator className="bg-transparent border-b border-black border-dotted my-1" />
                    </div>
                ))}
                <div className="flex flex-row items-center w-full">
                    <span className="text-xs text-stone-400">Sida {currentPage} av {totalPages}</span>
                    <Pagination className="ml-auto mr-0 w-auto mt-2">
                        <PaginationContent>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="size-6 bg-beige border-stone-400" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="sr-only">Föregående</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="size-6 bg-beige border-stone-400" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="sr-only">Nästa</span>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <ModalProvider requestGift={requestGift} />
        </div>
    );
};