import { Guest, Party } from "@prisma/client";

export type PartyWithGuests = Party & { guests: Guest[] };
