"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateGuest } from "./schema";
import { getPartyByEmail } from "@/data/data";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }

    const { partyId, firstName, lastName, foodPreferences, alcoholPreference, willAttend } = data;

    let guest;

    try {
        // throw new Error("a"); // artificial error - to be removed

        guest = await db.guest.create({
            data: {
                partyId,
                firstName,
                lastName,
                foodPreferences,
                alcoholPreference,
                willAttend
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to create." }
    }

    revalidatePath(`/admin/registry/${partyId}`);
    return { data: guest };
}

export const createGuest = createSafeAction(CreateGuest, handler);