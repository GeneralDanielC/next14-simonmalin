import * as z from "zod";

export const DeleteParty = z.object({
    partyId: z.string(),
});

