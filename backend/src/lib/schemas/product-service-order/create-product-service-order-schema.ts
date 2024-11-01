import { z } from 'zod'

export const createProductServiceOrderSchema = z.object({
    productId: z.string(),
    serviceOrderId: z.string(),
}).required();