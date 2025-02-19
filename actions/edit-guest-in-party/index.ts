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
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    let {
        partyId,
        guestId,
        firstName,
        lastName,
        foodPreferences,
        alcoholPreference,
        willAttend,
        willAttendNuptials,
        willAttendReception
    } = data;

    // VALIDATION
    if (!willAttend) {
        willAttendNuptials = false
        willAttendReception = false
    }

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
                willAttend,
                willAttendNuptials,
                willAttendReception,
                updatedAt: new Date(),
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