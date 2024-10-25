export interface IGetUserDto {
    id: string
    email: string,
    name: string,
    document: string,
    address?: string | null,
    number?: string | null,
    city?: string | null,
    neighborhood?: string | null,
    date: Date  
    userType: string
}