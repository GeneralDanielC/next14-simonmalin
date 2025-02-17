import * as z from "zod";

export const RequestGift = z.object({
    id: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).min(1, { message: "Required." }).email("Unvalid email."),
    count: z.optional(z.number().min(1))
});

