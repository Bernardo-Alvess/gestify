import { z } from 'zod'
import { UserType } from '../../../entities/User/user-type'

export const createUserSchema = z.object({
    id: z.string().uuid().nullable().optional(),
    name: z.string().min(2, "Name must be atleast 2 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    document: z.string().min(11, 'document reason must be atleast 11 characters long').max(14, 'Document must have less than 14 characters'),
    number: z.string().min(9, 'Number must have atleast 9 digits').nullable(),
    address: z.string().nullable(),
    userType: z.nativeEnum(UserType, {
        errorMap: () => ({ message: 'Invalid user type, must be of: ADMIN, TECHNICIAN, CLIENT OR OWNER' })
    }),
    //companyId: z.string().uuid()

}).strict()