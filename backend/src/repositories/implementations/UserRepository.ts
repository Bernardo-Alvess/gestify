import { User } from "../../entities/User/User";
import { prisma } from "../../lib/prisma";
import { IUserRepository } from "../IUserRepository";
import { Company } from "../../entities/Company/Company";
import { UserType } from "../../entities/User/user-type";
import { IUpdateUserDto } from "../../entities/User/dtos/IUpdateUserDto";
import { mapUserEntity } from "../../util/map-user-entity";

export class UserRepository implements IUserRepository {
    async getUserById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) {
            return {
                ...user,
                userType: user.userType as UserType
            }
        }

        return undefined
    }
    async getUsers(): Promise<User[] | undefined | User> {
        const data = await prisma.user.findMany()
        if (data) {
            const users = mapUserEntity(data)
            return users
        }

        return undefined


    }
    async updateUser(id: string, user: IUpdateUserDto): Promise<void | undefined> {
        await prisma.user.update({
            where: { id },
            data: {
                ...user
            }
        })
    }
    async deleteUser(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } })
    }


    async createUser(user: User): Promise<void> {

        const data = await prisma.company.findUnique({
            where: {
                id: user.companyId
            }
        })

        if (data) {
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    document: user.document,
                    number: user.number,
                    userType: user.userType,
                    companyId: user.companyId
                }
            })
        }

    }

}
