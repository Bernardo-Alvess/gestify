import { z } from "zod";

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
}).required()