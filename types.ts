import { Gift, GiftAssignment, Guest, Party } from "@prisma/client";

export type PartyWithGuests = Party & { guests: Guest[] };


export type GiftWithAssignments = Gift & { giftAssignments: GiftAssignment[] };
export type GiftsWithAssignments = GiftWithAssignments[];