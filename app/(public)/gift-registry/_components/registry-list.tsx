"use client";

import { ModalProvider } from "@/components/providers/modal-provider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useRequestGiftModal } from "@/hooks/use-request-gift-modal";
import { getAvailableGiftCount, getAvailableGifts } from "@/lib/gifts";
import { GiftsWithAssignments, GiftWithAssignments } from "@/types";
import { Gift } from "@prisma/client";
import { ChevronLeft, ChevronRight, ChevronsRight, Infinity, Info } from "lucide-react";
import { useState } from "react";

interface RegistryListProps {
    gifts: GiftWithAssignments[]
}

const ITEMS_PER_PAGE = 5;

export const RegistryList = ({
    gifts,
}: RegistryListProps) => {
    const requestGiftModal = useRequestGiftModal();

    const [hideList, setHideList] = useState<boolean>(false);
    const [requestGift, setRequestGift] = useState<GiftWithAssignments | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    // TO BE FIXED: SETUP A FUNCTION UTIL THAT CHECKS IF THE GIFT IS AVAILABLE.
    const filteredGifts = getAvailableGifts({ gifts });

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

    const handleOpenModal = (gift: GiftWithAssignments) => {
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
            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button variant="outline" className="w-full">Information om önkselistan</Button>
                </DialogTrigger>
                <DialogContent className="bg-beige">
                    <DialogHeader>
                        <DialogTitle>Information om önskelistan</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex flex-row gap-x-2">
                            <ChevronsRight className="size-5 flex-none" />
                            <span>Här hittar du en lista över brudparets önskade presenter.</span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <ChevronsRight className="size-5 flex-none" />
                            <span>Om du vill köpa något, <span className="font-bold">paxa</span> det genom att klicka på presenten och fylla i formuläret. Detta förhindrar att flera gäster råkar köpa samma sak.</span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <ChevronsRight className="size-5 flex-none" />
                            <span>Vissa presenter har en <span className="font-bold">begränsad kvantitet</span>. När du fyller i formuläret, reserverar du det antal du vill köpa. <span className="font-bold">Ange endast det antal du vill köpa</span>, så förblir resterande tillgängliga för andra gäster. När alla exemplar är reserverade, döljs presenten från listan.</span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <ChevronsRight className="size-5 flex-none" />
                            <span>Presenter utan begränsning är markerade med ett oändlighetstecken. Det är inte lika viktigt att reservera dessa, men om du vill ha en bekräftelse via mejl kan du ändå fylla i formuläret.</span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <ChevronsRight className="size-5 flex-none" />
                            <span>Vill du ta bort din reservation kan du kontakta {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full">Jag har förstått!</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col gap-y-0.5 mt-5">
                {currentGifts.map(gift => (
                    <div onClick={() => handleOpenModal(gift)} key={gift.id} className="flex flex-col p-1 rounded-lg hover:cursor-pointer hover:bg-stone-500/10">
                        <div className="flex flex-row justify-between items-center gap-x-2">
                            <div className="flex flex-col">
                                <span>{gift.title}</span>
                                <span className="text-xs text-stone-500/90">{gift.backstory}</span>
                            </div>
                            <div className="flex flex-col justify-center items-center text-stone-500">
                                <span>{gift.quantity ? `${getAvailableGiftCount({ gift })} / ${gift.quantity}` : <Infinity />}</span>
                                <span className="text-xs">tillgängliga</span>
                            </div>
                        </div>
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