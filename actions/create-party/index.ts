"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateParty } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { getUserById } from "@/data/auth/user";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user || !user.id) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    const { email } = data;

    if (!email) return { error: "Something went wrong! Missing email." }

    const existingParty = await getPartyByEmail(email);

    if (existingParty) { return { error: "The email address already exists." } }

    let party;

    try {
        // throw new Error("a"); // artificial error - to be removed

        party = await db.party.create({
            data: {
                email,
            },
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to create." }
    }

    revalidatePath(`/admin/registry`);
    return { data: party };
}

export const createParty = createSafeAction(CreateParty, handler);