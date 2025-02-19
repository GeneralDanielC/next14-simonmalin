"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { RequestGift } from "./schema";
import { getGiftById, getPartyByEmail } from "@/data/data";
import { sendGiftConfirmation, sendRSVPConfirmation } from "@/lib/mail";
import { getAvailableGiftCount } from "@/lib/gifts";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { id, email, count: requestedCount } = data;    

    if (!email) return { error: "Something went wrong! Missing title." }

    let giftAssignment;
    let gift;

    try {
        // throw new Error("a"); // artificial error - to be removed

        gift = await getGiftById(id)

        if (!gift) return { error: "Something went wrong. Could not find gift." }

        // VALIDATION
        if (gift.quantity && requestedCount) {
            const availableGiftCount = getAvailableGiftCount({ gift })

            if (availableGiftCount === 0) return { error: "Gift is no longer available." }
            if (availableGiftCount < requestedCount) return { error: "Så många exemplar finns inte att paxa. Ange lägre antal." }
        }

        giftAssignment = await db.giftAssignment.create({
            data: {
                giftId: id,
                email,
                count: requestedCount
            }
        })

        console.log("GiftAssignment creation complete", giftAssignment);
        

    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    await sendGiftConfirmation(email, gift, giftAssignment);

    revalidatePath(`/gift-registry`);
    return { data: giftAssignment };
}

export const requestGift = createSafeAction(RequestGift, handler);