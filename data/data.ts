import { db } from "@/lib/db";

export const getPartyByEmail = async (email: string) => {
    const party = await db.party.findFirst({
        where: {
            email
        },
        include: {
            guests: true
        }
    });

    return party;
}

export const getPartyById = async (id: string) => {
    const party = await db.party.findUnique({
        where: {
            id
        },
        include: {
            guests: true
        }
    });

    return party;
}

export const getParties = async () => {
    const parties = await db.party.findMany({ include: { guests: true } });

    return parties;
}