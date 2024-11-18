import { User } from "../../entities/User/User";
import { prisma } from "../../lib/prisma";
import { IUserRepository } from "../IUserRepository";
import { UserType } from "../../entities/User/user-type-enum";
import { IUpdateUserDto } from "../../entities/User/dtos/IUpdateUserDto";
import { IGetUserDto } from "../../entities/User/dtos/UGetUserDto";

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
    async getUsers(companyId: string, userType?: string, except?: string): Promise<IGetUserDto[] | undefined> {
        if (userType) {
            const users = await prisma.user.findMany({
                where: {
                    userType,
                    companyId
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    city: true,
                    neighborhood: true,
                    number: true,
                    userType: true,
                    date: true,
                }
            })

            if (users) return users
        }
        else if (except) {

            const users = await prisma.user.findMany({
                where: {
                    userType: {
                        not: except
                    },
                    companyId
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    city: true,
                    neighborhood: true,
                    number: true,
                    userType: true,
                    date: true,
                }
            })

            if (users) return users

        } else {
            const users = await prisma.user.findMany({
                where: {
                    companyId
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    city: true,
                    neighborhood: true,
                    number: true,
                    userType: true,
                    date: true,
                }
            })
            if (users) return users
        }
    }

    async getUserCount(companyId: string, userType?: string, except?: string): Promise<number> {
        if (userType) {
            const count = await prisma.user.count({
                where: {
                    userType,
                    companyId
                }
            })
            return count

        } else if (except) {
            const count = await prisma.user.count({
                where: {
                    userType: {
                        not: except
                    },
                    companyId
                }
            })
            return count
        }

        const count = await prisma.user.count({
            where: {
                companyId
            }
        })
        return count
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
