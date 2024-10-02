import { Gift } from "@prisma/client";

export const filterGiftsByIsAssigned = ({ gifts }: { gifts: Gift[] }) => {
    return gifts.filter(gift => !!gift.assignedToEmail);
}

export const filterGiftsByIsNotAssigned = ({ gifts }: { gifts: Gift[] }) => {
    return gifts.filter(gift => !gift.assignedToEmail);
}