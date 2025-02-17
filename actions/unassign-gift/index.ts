"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UnassignGift } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendNewAssignedGiftToClient, sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }

    const { id } = data;

    let giftAssignment;

    try {
        // throw new Error("a"); // artificial error - to be removed

        giftAssignment = await db.giftAssignment.delete({
            where: {
                id
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to unassign." }
    }

    revalidatePath(`/admin/registry`);
    return { data: giftAssignment };
}

export const unassignGift = createSafeAction(UnassignGift, handler);