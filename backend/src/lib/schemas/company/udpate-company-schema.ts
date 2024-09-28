import { z } from 'zod'

export const updateCompanySchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().min(2, "Name must be atleast 2 characters long"),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    corporateReason: z.string().min(2, 'Corporate reason must be atleast 2 characters long'),
}).strict()