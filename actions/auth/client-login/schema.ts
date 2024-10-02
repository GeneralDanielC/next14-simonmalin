import * as z from "zod";

export const ClientLogin = z.object({
    password: z.string(),
});

