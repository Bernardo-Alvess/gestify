import { getUserById } from "./get-user-by-id"

export const fetchOrdersForTechnician = async (token: string, id: string | undefined, name: string | undefined, type: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order/client/${id}/${type}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { serviceOrders } = await response.json()

    for (const serviceOrder of serviceOrders) {
        const hasClient = serviceOrder.clientId ? true : false
        if (hasClient) {
            const client = await getUserById(token, serviceOrder.clientId);
            serviceOrder.clientId = client.name
        }
        serviceOrder.technicianId = name
    }

    console.log(serviceOrders)

    return serviceOrders
}