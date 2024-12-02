import { z } from 'zod'
import { StatusEnum } from '../../../entities/ServiceOrder/status-enum'

export const createServiceOrderSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    description: z.string().optional().nullable(),
    defect: z.string().optional().nullable(),
    report: z.string().optional().nullable(),
    extras: z.string().optional().nullable(),
    number: z.string().optional().nullable(),
    userId: z.string().uuid(),
    status: z.nativeEnum(StatusEnum, {
        errorMap: () => ({ message: 'Status must be of value: EM ANDAMENTO, FECHADO, ABERTO, PENDENTE or CANCELADO' })
    }),
    technicianId: z.string().uuid().optional().nullable(),
    clientId: z.string().uuid().optional(),
    date: z.string().optional()
}).strict()