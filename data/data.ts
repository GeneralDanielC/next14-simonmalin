import { db } from "@/lib/db";

export const getPartyByEmail = async (email: string) => {
    const party = await db.party.findFirst({
        where: {
            email
        },
        include: {
            guests: true
        },
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
        },
    });

    return party;
}

export const getParties = async () => {
    const parties = await db.party.findMany({
        include: { guests: true },
    });

    return parties;
}

export const getGifts = async () => {
    const gifts = await db.gift.findMany({ include: { giftAssignments: true }, orderBy: {order: "asc"} });

    return gifts;
}

export const getGiftById = async (id: string) => {
    const gift =  await db.gift.findUnique({ where: { id }, include: { giftAssignments: true } })

    return gift;
}