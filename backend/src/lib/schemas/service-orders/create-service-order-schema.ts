import { z } from 'zod'

export const createServiceOrderSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    description: z.string().optional().nullable(),
    defect: z.string().optional().nullable(),
    report: z.string().optional().nullable(),
    extras: z.string().optional().nullable(),
    userId: z.string().uuid(),
    statusId: z.string().uuid(),
    technicianId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
}).strict()