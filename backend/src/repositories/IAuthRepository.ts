import { IUserAuthDto } from "../entities/User/dtos/IUserAuthDto";
import { User } from "../entities/User/User";

export interface IAuthRepository {
    findUser(email: string): Promise<IUserAuthDto | undefined>
}