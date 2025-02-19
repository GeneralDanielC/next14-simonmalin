"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditGift } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { id, title, backstory, url, quantity, hidden } = data;

    if (!title) return { error: "Something went wrong! Missing title." }

    let gift;

    try {
        // throw new Error("a"); // artificial error - to be removed

        gift = await db.gift.update({
            where: {
                id
            },
            data: {
                title,
                backstory,
                url,
                quantity: quantity === 0 ? null : quantity,
                updatedAt: new Date(),
                hidden
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    revalidatePath(`/admin/registry`);
    return { data: gift };
}

export const editGift = createSafeAction(EditGift, handler);