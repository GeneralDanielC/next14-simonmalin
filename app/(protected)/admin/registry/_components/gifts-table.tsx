"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Gift } from "@prisma/client"
import { Check, Infinity, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ModalProvider } from "@/components/providers/modal-provider"
import { useEditGiftModal } from "@/hooks/use-edit-gift-modal"
import { GiftWithAssignments } from "@/types"
import { getAvailableGiftCount } from "@/lib/gifts"

interface GiftsTableProps {
    gifts: GiftWithAssignments[]
}

export const GiftsTable = ({
    gifts
}: GiftsTableProps) => {
    const editGiftModal = useEditGiftModal();

    const [gift, setGift] = useState<GiftWithAssignments | undefined>();

    const handleOpenModal = (giftId: string) => {
        const gift = gifts.find(gift => gift.id === giftId);
        if (!gift) return;

        setGift(gift);
        editGiftModal.onOpen();
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title & Backstory</TableHead>
                        <TableHead className="text-left">Available / Count</TableHead>
                        <TableHead className="text-right">Assignments</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gifts?.map(gift => (
                        <TableRow key={gift.id} className="hover:cursor-pointer" onClick={() => handleOpenModal(gift.id)}>
                            <TableCell>
                                <div className="font-medium">{gift.title}</div>
                                <div className=" text-xs text-muted-foreground md:inline">
                                    {gift.backstory}
                                </div>
                            </TableCell>
                            <TableCell className="">
                                {gift.quantity ? `${getAvailableGiftCount({ gift })} / ${gift.quantity}` : <Infinity />}
                            </TableCell>
                            <TableCell className="text-right text-xs flex flex-col">
                                {gift.giftAssignments.map(gift =>
                                    <span key={gift.id}>{gift.email}</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalProvider gift={gift} />
        </>
    )
}