"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditRSVP } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { partyId, email, guests } = data;
    
    if (!partyId) return {error: "Something went wrong! Missing id."}

    if (!email) return { error: "Something went wrong! Missing email." }

    if (guests.length === 0) return { error: "Du måste ange åtminstone en gäst." }

    let party;

    try {
        // throw new Error("a"); // artificial error - to be removed

        party = await db.party.update({
            where: { id: partyId },
            data: {
                email,
                guests: {
                    update: guests.map((guest) => ({
                        where: { id: guest.id },  // Find guest by ID
                        data: {
                            firstName: guest.firstName,
                            lastName: guest.lastName,
                            foodPreferences: guest.foodPreferences,
                            alcoholPreference: guest.alcoholPreference,
                            willAttend: guest.willAttend,
                        },
                    })),
                },
            },
            include: {
                guests: true,
            },
        });


    } catch (error) {
        console.error(error);
        return { error: "Failed to update." }
    }

    await sendRSVPConfirmation(email, party);

    revalidatePath(`/osa`);
    return { data: party };
}

export const editRSVP = createSafeAction(EditRSVP, handler);