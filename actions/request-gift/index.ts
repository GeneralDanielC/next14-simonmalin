"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { RequestGift } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendGiftConfirmation, sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { id, assignedToEmail } = data;

    if (!assignedToEmail) return { error: "Something went wrong! Missing title." }

    let gift;

    try {
        // throw new Error("a"); // artificial error - to be removed

        gift = await db.gift.update({
            where: {
                id,
            },
            data: {
                assignedToEmail
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    await sendGiftConfirmation(assignedToEmail, gift);

    revalidatePath(`/osa`);
    return { data: gift };
}

export const requestGift = createSafeAction(RequestGift, handler);