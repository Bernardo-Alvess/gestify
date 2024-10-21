import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number().nonnegative(),
  cost: z.number().nullable(),
  unityType: z.string().nullable(),
  minQtd: z.number().nullable(),
  qtd: z.number().nullable(),
  companyId: z.string(),
}).required();