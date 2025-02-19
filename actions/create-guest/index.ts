"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateGuest } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { getUserById } from "@/data/auth/user";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    let { partyId, firstName, lastName, foodPreferences, alcoholPreference, willAttend, willAttendNuptials, willAttendReception } = data;

    // VALIDATION
    if (!willAttend) {
        willAttendNuptials = false
        willAttendReception = false
    }

    if (!firstName || !lastName) return { error: "Name is needed." }

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
                willAttend,
                willAttendNuptials,
                willAttendReception
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