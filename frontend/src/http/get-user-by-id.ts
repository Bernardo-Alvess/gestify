export interface IUser {
    email: string,
    name: string,
    document: string,
    address?: string | null,
    number?: string | null,
    userType: string
}

export const getUserById = async (token: string, id: string | undefined) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { user } = await response.json()
    return user

}