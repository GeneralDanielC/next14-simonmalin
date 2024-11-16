import * as z from "zod";

export const CreateGuest = z.object({
    partyId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    foodPreferences: z.optional(z.string()),
    alcoholPreference: z.boolean(),
    willAttend: z.boolean(),
    willAttendNuptials: z.boolean(),
    willAttendReception: z.boolean(),
});

