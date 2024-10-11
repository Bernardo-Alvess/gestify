import { getUserById } from "./get-user-by-id"

export const getServiceOrders = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { serviceOrders } = await response.json()

    for (const serviceOrder of serviceOrders) {
        const hasTechnician = serviceOrder.technicianId ? true : false
        const hasClient = serviceOrder.clientId ? true : false

        if (hasTechnician && hasClient) {
            const [technician, client] = await Promise.all([
                getUserById(token, serviceOrder.technicianId),
                getUserById(token, serviceOrder.clientId)
            ])

            serviceOrder.technicianId = technician.name
            serviceOrder.clientId = client.name

        } else if (hasTechnician) {
            const technician = await getUserById(token, serviceOrder.technicianId);
            serviceOrder.technicianId = technician

        } else if (hasClient) {
            const client = await getUserById(token, serviceOrder.client);
            serviceOrder.clientId = client
        }
    }

    return serviceOrders
}