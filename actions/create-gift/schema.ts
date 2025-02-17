import * as z from "zod";

export const CreateGift = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(1, { message: "Required." }),
    backstory: z.optional(z.string()),
    url: z.optional(z.string()),
    quantity: z.optional(z.number().min(0))
});

