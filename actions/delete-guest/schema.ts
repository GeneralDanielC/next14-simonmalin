import * as z from "zod";

export const DeleteGuest = z.object({
    id: z.string(),
});

