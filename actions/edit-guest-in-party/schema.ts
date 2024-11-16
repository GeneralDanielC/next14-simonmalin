import * as z from "zod";

export const EditGuestInParty = z.object({
    partyId: z.string(),
    guestId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    foodPreferences: z.optional(z.string()),
    alcoholPreference: z.boolean(),
    willAttend: z.boolean(),
    willAttendNuptials: z.boolean(),
    willAttendReception: z.boolean(),
});

