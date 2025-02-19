"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteParty } from "./schema";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { partyId } = data;

    if (!partyId) return { error: "Something went wrong! Missing id." }

    let party;

    try {
        // throw new Error("a"); // artificial error - to be removed

        party = await db.party.delete({
            where: { id: partyId },
        });


    } catch (error) {
        console.error(error);
        return { error: "Failed to delete." }
    }

    revalidatePath(`/admin/parties`);
    return { data: party };
}

export const deleteParty = createSafeAction(DeleteParty, handler);