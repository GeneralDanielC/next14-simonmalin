"use client"

import {
    DragDropContext,
    Draggable,
    Droppable
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react"
import { Gift } from "@prisma/client"
import { Check, Eye, EyeOff, Infinity, X } from "lucide-react"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ModalProvider } from "@/components/providers/modal-provider"
import { useEditGiftModal } from "@/hooks/use-edit-gift-modal"
import { GiftWithAssignments } from "@/types"
import { getAvailableGiftCount } from "@/lib/gifts"
import { useAction } from "@/hooks/use-action";
import { updateGiftOrder } from "@/actions/update-gift-order";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface GiftsTableProps {
    gifts: GiftWithAssignments[]
}

export const GiftsTable = ({
    gifts
}: GiftsTableProps) => {
    const editGiftModal = useEditGiftModal();

    const [gift, setGift] = useState<GiftWithAssignments | undefined>();

    const [giftList, setGiftList] = useState<GiftWithAssignments[]>(gifts);

    const handleOpenModal = (giftId: string) => {
        const gift = gifts.find(gift => gift.id === giftId);
        if (!gift) return;

        setGift(gift);
        editGiftModal.onOpen();
    }

    const { execute } = useAction(updateGiftOrder, {
        onSuccess: (data) => {
            toast.success("Successfully reordered gifts.")
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        // If dropped outside droppable area
        if (!destination) return;

        // If dropped in the same place, do nothing
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Clone the list to avoid direct state mutation
        const reorderedGifts = Array.from(giftList);
        const [movedGift] = reorderedGifts.splice(source.index, 1); // Remove dragged item
        reorderedGifts.splice(destination.index, 0, movedGift); // Insert at new position

        // Update the `order` values for each gift
        const updatedGifts = reorderedGifts.map((gift, index) => ({
            ...gift,
            order: index,  // Assign new order index
        }));

        // Update local state
        setGiftList(updatedGifts);

        // Send the reordered gifts to the server
        execute({
            gifts: updatedGifts,
        });
    };

    useEffect(() => {
        setGiftList(gifts)
    }, [gifts])

    return (
        <>
            <DragDropContext
                onDragStart={() => {
                    if (window.navigator.vibrate) {
                        window.navigator.vibrate(100);
                    }
                }}
                onDragEnd={onDragEnd}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="flex flex-col">
                                <span>Title</span>
                                <span className="text-xs">Backstory</span>
                            </TableHead>
                            <TableHead className="text-center w-fit">Available</TableHead>
                            <TableHead className="text-center w-fit">Visibility</TableHead>
                            <TableHead className="text-right hidden sm:block">Assignments</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Droppable droppableId="gifts-list">
                        {(provided) => (
                            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                                {giftList.map((gift, index) => (
                                    <Draggable key={gift.id} draggableId={gift.id} index={index}>
                                        {(provided, snapshot) => (
                                            <TableRow
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`hover:cursor-pointer ${snapshot.isDragging && "bg-accent flex flex-row justify-between items-center"}`}
                                                onClick={() => handleOpenModal(gift.id)}
                                            >
                                                <TableCell className={cn(snapshot.isDragging && "flex-1 h-full")}>
                                                    <div className="font-medium">{gift.title}</div>
                                                    <div className="text-xs text-muted-foreground md:inline">
                                                        {gift.backstory}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center w-full">
                                                        {gift.quantity
                                                            ? `${getAvailableGiftCount({ gift })} / ${gift.quantity}`
                                                            : <Infinity />}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex w-full items-center justify-center">
                                                        {gift.hidden ? <EyeOff className="size-4 text-rose-500" /> : <Eye className="size-4 text-emerald-500" />}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right text-xs flex-col text-muted-foreground hidden sm:flex">
                                                    {gift.giftAssignments.map((assignment) => (
                                                        <span key={assignment.id}>{assignment.email}</span>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                            </TableBody>
                        )}
                    </Droppable>
                </Table>
            </DragDropContext>
            <ModalProvider gift={gift} />
        </>
    )
}