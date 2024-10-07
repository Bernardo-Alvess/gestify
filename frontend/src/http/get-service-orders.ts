import { getStatus } from "./get-status"
import { getUserById } from "./get-user-by-id"

export const getServiceOrders = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { serviceOrders } = await response.json()

    for (const serviceOrder of serviceOrders) {
        console.log(serviceOrder)
        const hasTechnician = serviceOrder.technicianId ? true : false
        const hasClient = serviceOrder.clientId ? true : false


        if (hasTechnician && hasClient) {
            const [technician, client] = await Promise.all([
                getUserById(token, serviceOrder.technicianId),
                getUserById(token, serviceOrder.clientId)

            ])

            serviceOrder.technicianId = technician.name
            serviceOrder.clientId = client.name
        }

        const status = await getStatus(token, serviceOrder.statusId)
        serviceOrder.statusId = status.name
        console.log(status)
        console.log(serviceOrder)

    }

    return serviceOrders
}