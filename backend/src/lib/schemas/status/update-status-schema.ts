import { z } from "zod";

export const updateStatusSchema = z.object({
    id: z.string().uuid(),
    body: z.object({
        name: z.string().min(5, 'Status name must have atleast 5 characters')
    })
}).required().strict()