import { ZodUndefinedDef } from "zod";
import { User } from "../entities/User/User";
import { Company } from "@prisma/client";
import { IUpdateUserDto } from "../entities/User/dtos/IUpdateUserDto";
import { UserType } from "../entities/User/user-type-enum";
import { IGetUserDto } from "../entities/User/dtos/UGetUserDto";

export interface IUserRepository {
    createUser(user: User, company: Company): Promise<void>
    getUserById(id: string): Promise<User | undefined>
    getUsers(companyId: string, userType?: string, except?: string): Promise<IGetUserDto[] | undefined | User>
    updateUser(id: string, user: IUpdateUserDto): Promise<void | undefined>
    deleteUser(id: string): Promise<void>
    getUserCount(companyId: string, userType?: string, except?: string): Promise<number>
}