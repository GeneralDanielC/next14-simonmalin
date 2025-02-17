import { GiftsWithAssignments, GiftWithAssignments } from "@/types";
import { Gift } from "@prisma/client";

export const getAssignedGifts = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    let assignedGifts = 0;

    gifts.map(gift => {
        if (gift.giftAssignments.length > 0) {
            assignedGifts++;
        }
    });

    return assignedGifts;
}

export const getNotAssignedGifts = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    let notAssignedGifts = 0;

    gifts.map(gift => {
        if (gift.giftAssignments.length === 0) {
            notAssignedGifts++;
        }
    });

    return notAssignedGifts;
}

export const getAvailableGiftCount = ({ gift }: { gift: GiftWithAssignments }) => {
    if (!gift.quantity) return 999;

    let count = 0;

    gift.giftAssignments.map(giftAssignment => {
        count += giftAssignment.count;
    })

    return gift?.quantity - count;
}

export const getAvailableGifts = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    return gifts.filter(gift => {
        const assignedCount = gift.giftAssignments.reduce((total, assignment) => total + (assignment.count || 0), 0);
        return gift.quantity ? assignedCount < gift.quantity : true;
    });
};