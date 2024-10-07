import { z } from "zod";

export const createStatusSchema = z.object({
    name: z.string().min(5, 'Status name must have atleat 5 characters'),
}).strict().required()