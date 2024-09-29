"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditGuestInParty } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {

    const {
        partyId,
        guestId,
        firstName,
        lastName,
        foodPreferences,
        alcoholPreference,
        willAttend
    } = data;

    let guest;

    try {
        // throw new Error("a"); // artificial error - to be removed

        guest = await db.guest.update({
            where: { id: guestId },
            data: {
                firstName,
                lastName,
                foodPreferences,
                alcoholPreference,
                willAttend
            },
        });


    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    revalidatePath(`/admin/parties/${partyId}`);
    return { data: guest };
}

export const editGuestInParty = createSafeAction(EditGuestInParty, handler);