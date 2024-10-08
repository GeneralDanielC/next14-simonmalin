import * as z from "zod";

export const RequestGift = z.object({
    id: z.string(),
    assignedToEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).min(1, { message: "Required." }).email("Unvalid email."),
});

