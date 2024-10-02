import { Gift } from "@prisma/client";

export const getAssignedGifts = ({ gifts }: { gifts: Gift[] }) => {
    let assignedGifts = 0;

    gifts.map(gift => {
        if (gift.assignedToEmail) {
            assignedGifts++;
        }
    });

    return assignedGifts;
}

export const getNotAssignedGifts = ({ gifts }: { gifts: Gift[] }) => {
    let notAssignedGifts = 0;

    gifts.map(gift => {
        if (!gift.assignedToEmail) {
            notAssignedGifts++;
        }
    });

    return notAssignedGifts;
}