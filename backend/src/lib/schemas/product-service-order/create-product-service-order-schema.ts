import { z } from 'zod'

export const createProductServiceOrderSchema = z.object({
    productId: z.string().uuid(),
    serviceOrderId: z.string().uuid(),
    qtd: z.number()
}).required();