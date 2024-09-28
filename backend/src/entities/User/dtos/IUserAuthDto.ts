import { UserType } from "../user-type";

export interface IUserAuthDto {
    id: string,
    email: string,
    password: string,
    userType: string,
    companyId: string,
}