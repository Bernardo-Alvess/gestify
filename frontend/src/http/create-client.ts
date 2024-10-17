export interface ICreateClient {
    name?: string | null | undefined,
    email?: string | null,
    document?: string | null,
    address?: string | null,
    neighborhood?: string | null,
    city?: string | null,
    number?: string | null
}

export const createClient = async (token: string, data: ICreateClient) => {
    Object.assign(data, { userType: 'CLIENT', password: 'fd2aj!!!ksl;dflkj1243j12lk3jJKL#@JAKlf#j;sldkllll' });

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const { id } = await response.json()

    return { id }
}