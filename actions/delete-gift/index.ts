"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteGift } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }

    const { id } = data;

    let gift;

    try {
        // throw new Error("a"); // artificial error - to be removed

        gift = await db.gift.delete({
            where: {
                id
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to delete." }
    }

    revalidatePath(`/admin/registry`);
    return { data: gift };
}

export const deleteGift = createSafeAction(DeleteGift, handler);