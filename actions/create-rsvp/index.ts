"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateRSVP } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendRSVPConfirmation } from "@/lib/mail";

const handler = async (data: InputType): Promise<ReturnType> => {

    // TODO: AUTHORIZE USERS SO THEY ARE LOGGED IN TO THE SITE.

    const { email, guests } = data;

    if (!email) return { error: "Missing data. Something went wrong!" }

    if (guests.length === 0) return { error: "Du måste ange åtminstone en gäst." }

    const existingParty = await getPartyByEmail(email);

    if (existingParty) { return { error: "Du har redan osat. Klicka på länken i mejlet för att göra ändringar." } }

    if (new Date().getTime() > new Date(process.env.NEXT_PUBLIC_END_RSVP_DATE || "2025-01-01").getTime()) return { error: "Det är försent för att OSA!" }

    // Validation & Correction
    guests.map(guest => {
        if (!guest.willAttend) {
            guest.willAttendNuptials = false
            guest.willAttendReception = false
        }

        if (guest.willAttend) {
            if (!guest.willAttendNuptials && !guest.willAttendReception) return { error: `${guest.firstName} ${guest.lastName}. Ange någon del av bröllopet att delta på.`}
        }
    })

    let party;

    try {
        // throw new Error("a"); // artificial error - to be removed

        party = await db.party.create({
            data: {
                email,
                guests: {
                    create: guests.map((guest) => ({
                        firstName: guest.firstName,
                        lastName: guest.lastName,
                        foodPreferences: guest.foodPreferences,
                        alcoholPreference: guest.alcoholPreference,
                        willAttend: guest.willAttend,
                        willAttendNuptials: guest.willAttendNuptials,
                        willAttendReception: guest.willAttendReception,
                    })),
                },
            },
            include: {
                guests: true
            }
        });


    } catch (error) {
        console.error(error);
        return { error: "Failed to create." }
    }

    await sendRSVPConfirmation(email, party);

    revalidatePath(`/osa`);
    return { data: party };
}

export const createRSVP = createSafeAction(CreateRSVP, handler);