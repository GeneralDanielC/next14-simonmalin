import * as z from "zod";

export const EditGift = z.object({
    id: z.string(),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(1, { message: "Required." }),
    backstory: z.optional(z.string()),
    url: z.optional(z.string()),
    assignedToEmail: z.optional(z.string()),
    prevAssignedToEmail: z.optional(z.string()),
});

