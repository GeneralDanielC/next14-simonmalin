"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditParty } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {

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