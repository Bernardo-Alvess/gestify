import { z } from "zod";
import { UserType } from "../../../entities/User/user-type-enum";

export const updateUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, "Name must be at least 2 characters long").optional(),
    email: z.string().email().optional(),
    password: z.string().min(8, "Password must be at least 8 characters long").optional(),
    document: z.string().min(11, 'Document must be at least 11 characters long').max(14, 'Document must have less than 14 characters').optional(),
    number: z.string().min(9, 'Number must have at least 9 digits').nullable().optional(),
    address: z.string().nullable().optional(),
    userType: z.nativeEnum(UserType, {
        errorMap: () => ({ message: 'Invalid user type, must be one of: ADMIN, TECHNICIAN, CLIENT, or OWNER' })
    }).optional(), // Optional, and only accepts valid enum values
}).strict(); // Ensures no extra fields are provided
