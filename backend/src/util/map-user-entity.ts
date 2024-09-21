import { UserType } from "../entities/User/user-type"

interface IUserProps {
    id: string,
    email: string
    name: string,
    number?: string | null
    address?: string | null,
    document: string,
    userType: string,
    companyId: string,
    password: string
}

const mapUserEntity = (data: IUserProps[] | IUserProps) => {
    if (Array.isArray(data))
        return data.map((user) => {
            return {
                ...user,
                userType: user.userType as UserType
            }
        })

    return {
        ...data,
        userType: data.userType as UserType
    }


}

export { mapUserEntity }