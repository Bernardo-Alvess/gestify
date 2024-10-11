import { UserType } from "../user-type-enum";

export interface IUserAuthDto {
    id: string,
    email: string,
    password: string,
    userType: string,
    companyId: string,
}