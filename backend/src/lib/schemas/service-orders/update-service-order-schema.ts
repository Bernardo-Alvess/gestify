import { z } from "zod";

export const updateServiceOrderSchema = z.object({
        description: z.string().optional().nullable(),
        defect: z.string().optional().nullable(),
        report: z.string().optional().nullable(),
        extras: z.string().optional().nullable(),
        status: z.string(),
        number: z.string().optional().nullable(),
        technicianId: z.string().uuid().optional(),
        clientId: z.string().uuid().optional()
})