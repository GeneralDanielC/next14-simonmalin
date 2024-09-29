import * as z from "zod";

export const EditParty = z.object({
    partyId: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).min(1, { message: "Required." }).email("Unvalid email."),
});

