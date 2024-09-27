import * as z from "zod";

const guestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    foodPreferences: z.optional(z.string()),
    alcoholPreference: z.boolean(),
    willAttend: z.boolean(),
});

export const CreateRSVP = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).min(1, { message: "Required." }).email("Unvalid email."),
    guests: z.array(guestSchema),
});

