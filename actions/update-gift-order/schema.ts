import * as z from "zod";

export const UpdateGiftOrder = z.object({
    gifts: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            backstory: z.string().nullable(),
            url: z.string().nullable(),
            quantity: z.number().nullable(), 
            order: z.number(),
            hidden: z.boolean(),
            createdAt: z.date(),
            updatedAt: z.date(),
            giftAssignments: z.array(
                z.object({
                    id: z.string(),
                    email: z.string(),
                    count: z.number().nullable(), 
                    giftId: z.string(),
                    createdAt: z.date(),
                })
            ),
        })
    ),
});

