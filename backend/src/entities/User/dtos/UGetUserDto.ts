export interface IGetUserDto {
    email: string,
    name: string,
    document: string,
    address?: string | null,
    number?: string | null,
    userType: string
}