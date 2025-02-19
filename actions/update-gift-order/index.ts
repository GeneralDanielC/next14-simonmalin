"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateGiftOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { gifts } = data;

    let updatedGifts;

    try {
        // throw new Error("a"); // artificial error - to be removed

        const transaction = gifts.map((gift) => db.gift.update({
            where: {
                id: gift.id,
            },
            data: {
                order: gift.order,
            }
        }));

        updatedGifts = await db.$transaction(transaction);

    } catch (error) {
        console.error(error);
        return { error: "Failed to reorder." }
    }

    revalidatePath(`/admin/registry`);
    return { data: updatedGifts };
}

export const updateGiftOrder = createSafeAction(UpdateGiftOrder, handler);