import { ZodUndefinedDef } from "zod";
import { User } from "../entities/User/User";
import { Company } from "@prisma/client";
import { IUpdateUserDto } from "../entities/User/dtos/IUpdateUserDto";

export interface IUserRepository {
    createUser(user: User, company: Company): Promise<void>
    getUserById(id: string): Promise<User | undefined>
    getUsers(): Promise<User[] | undefined | User>
    updateUser(id: string, user: IUpdateUserDto): Promise<void | undefined>
    deleteUser(id: string): Promise<void>
}