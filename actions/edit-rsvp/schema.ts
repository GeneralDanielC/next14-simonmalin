import * as z from "zod";

const guestSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    foodPreferences: z.optional(z.string()),
    alcoholPreference: z.boolean(),
    willAttend: z.boolean(),
    willAttendNuptials: z.boolean(),
    willAttendReception: z.boolean(),
});

export const EditRSVP = z.object({
    partyId: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).min(1, { message: "Required." }).email("Unvalid email."),
    guests: z.array(guestSchema),
});

