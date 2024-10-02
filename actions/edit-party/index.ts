"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditParty } from "./schema";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }

    const { partyId, email, } = data;
    
    if (!partyId) return {error: "Something went wrong! Missing id."}

    if (!email) return { error: "Something went wrong! Missing email." }

    let party;

    try {
        // throw new Error("a"); // artificial error - to be removed

        party = await db.party.update({
            where: { id: partyId },
            data: {
                email,
                updatedAt: new Date(),
            },
            include: {
                guests: true,
            },
        });


    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    revalidatePath(`/admin/parties/${partyId}`);
    return { data: party };
}

export const editParty = createSafeAction(EditParty, handler);