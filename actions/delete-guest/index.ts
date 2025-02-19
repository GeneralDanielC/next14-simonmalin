"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteGuest } from "./schema";
import { getUserById } from "@/data/auth/user";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { id } = data;

    let guest;

    try {
        // throw new Error("a"); // artificial error - to be removed

        guest = await db.guest.delete({
            where: {
                id
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to delete." }
    }

    revalidatePath(`/admin/registry`);
    return { data: guest };
}

export const deleteGuest = createSafeAction(DeleteGuest, handler);