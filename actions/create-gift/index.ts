"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateGift } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { title, backstory, url, quantity, hidden } = data;

    if (!title) return { error: "Something went wrong! Missing title." }

    let gift;

    try {
        // throw new Error("a"); // artificial error - to be removed
        const maxOrderGift = await db.gift.findFirst({
            orderBy: {
                order: 'desc',
            },
            select: {
                order: true,
            }
        });

        const newOrder = maxOrderGift ? maxOrderGift.order + 1 : 0;

        gift = await db.gift.create({
            data: {
                title,
                backstory,
                url,
                quantity: quantity === 0 ? null : quantity,
                order: newOrder,
                hidden
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to create." }
    }

    revalidatePath(`/admin/registry`);
    return { data: gift };
}

export const createGift = createSafeAction(CreateGift, handler);