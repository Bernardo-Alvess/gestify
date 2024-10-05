import { User } from "../../entities/User/User";
import { prisma } from "../../lib/prisma";
import { IUserRepository } from "../IUserRepository";
import { UserType } from "../../entities/User/user-type";
import { IUpdateUserDto } from "../../entities/User/dtos/IUpdateUserDto";
import { mapUserEntity } from "../../util/map-user-entity";
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
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    number: true,
                    userType: true
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
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    number: true,
                    userType: true
                }
            })

            if (users) return users

        } else {
            const users = await prisma.user.findMany({
                where: {
                    companyId
                },
                select: {
                    email: true,
                    name: true,
                    document: true,
                    address: true,
                    number: true,
                    userType: true
                }
            })
            if (users) return users
        }
    }


    // async getClients(): Promise<User[] | undefined> {
    //     const data = await prisma.user.findMany({
    //         where: {
    //             userType: 'CLIENT'
    //         }
    //     })
    //     if(data){
    //         const users = mapUserEntity()
    //     } return data
    //     return undefined
    // }

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

        console.log(data)

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

    async getUserCount(): Promise<number> {
        const count = await prisma.user.count()

        return count
    }

}
