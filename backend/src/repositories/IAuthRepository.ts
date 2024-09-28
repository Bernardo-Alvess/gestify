import { IUserAuthDto } from "../entities/User/dtos/IUserAuthDto";

export interface IAuthRepository {
    findUser(email: string): Promise<IUserAuthDto | undefined>
}