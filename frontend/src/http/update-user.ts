import { IUpdateClient } from "../pages/Clients/EditClients";

export const updateUser = async (token: string, id: string | undefined, data: IUpdateClient) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    const { updated } = await response.json()

    return { updated }
}