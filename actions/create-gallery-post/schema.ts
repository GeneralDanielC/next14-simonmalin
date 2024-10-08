import * as z from "zod";

export const CreateGalleryPost = z.object({
    name: z.optional(z.string()),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required",
    }).min(1, { message: "Required." }).email("Invalid email."),
    comment: z.optional(z.string()),
    fileName: z.string(),
    fileType: z.string(),
    hidden: z.boolean(),
});
