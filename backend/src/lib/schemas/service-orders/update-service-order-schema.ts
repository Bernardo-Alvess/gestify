import { z } from "zod";

export const updateServiceOrderSchema = z.object({
        description: z.string().optional().nullable(),
        defect: z.string().optional().nullable(),
        report: z.string().optional().nullable(),
        extras: z.string().optional().nullable(),
        statusId: z.string().uuid(),
        technicianId: z.string().uuid().optional(),
        clientId: z.string().uuid().optional()

})