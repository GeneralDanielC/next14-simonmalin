"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { EditRSVP } from "./schema";
import { getPartyByEmail, getPartyById } from "@/data/data";
import { sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { partyId, email: passedEmail, guests } = data;

    if (!partyId) return { error: "Something went wrong! Missing id." }

    if (!passedEmail) return { error: "Something went wrong! Missing email." }

    const email = passedEmail.toLowerCase();

    if (guests.length === 0) return { error: "Du måste ange åtminstone en gäst." }

    if (new Date().getTime() > new Date(process.env.NEXT_PUBLIC_END_RSVP_DATE || "2025-03-30").getTime()) return { error: "Det är försent för att OSA!" }

    // Validation & Correction
    guests.map(guest => {
        if (!guest.willAttend) {
            guest.willAttendNuptials = false
            guest.willAttendReception = false
        }
    })

    let party;

    try {
        // Fetching and checking current guests in the party.
        const existingParty = await getPartyById(partyId);

        if (!existingParty) return { error: "Something went wrong! Party could not be found." }

        const existingGuests = existingParty.guests;

        const updatedGuestIds = guests.map((guest) => guest.id);

        const guestsToDelete = existingGuests.filter(
            (guest) => !updatedGuestIds.includes(guest.id)
        );

        // Perform deletion for guests no longer in the updated list
        await Promise.all(
            guestsToDelete.map((guest) =>
                db.guest.delete({ where: { id: guest.id } })
            )
        );

        // Updating the party with remaining guests
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
                            willAttendNuptials: guest.willAttendNuptials,
                            willAttendReception: guest.willAttendReception
                        },
                    })),
                },
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

    await sendRSVPConfirmation(email, party);

    revalidatePath(`/osa`);
    return { data: party };
}

export const editRSVP = createSafeAction(EditRSVP, handler);