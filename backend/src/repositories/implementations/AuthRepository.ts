import { IUserAuthDto } from "../../entities/User/dtos/IUserAuthDto";
import { prisma } from "../../lib/prisma";
import { IAuthRepository } from "../IAuthRepository";

export class AuthRepository implements IAuthRepository {
    async findUser(email: string): Promise<IUserAuthDto | undefined> {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (user)
            return user;

        return undefined
    }

}