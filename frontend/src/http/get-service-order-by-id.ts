import { getUserById } from "./get-user-by-id"

export const getServiceOrdersById = async (token: string, id: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const { serviceOrder } = await response.json()

    const hasTechnician = serviceOrder.technicianId ? true : false
    const hasClient = serviceOrder.clientId ? true : false

    if (hasTechnician) {
        const technician = await getUserById(token, serviceOrder.technicianId);
        serviceOrder.technicianId = technician.name
    }
    if (hasClient) {
        const client = await getUserById(token, serviceOrder.clientId)
        serviceOrder.clientId = client.name
    }

    console.log(serviceOrder)

    return serviceOrder
}