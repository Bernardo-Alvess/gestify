import { getUserById } from "./get-user-by-id"

export const fetchOrdersForClient = async (token: string, id: string | undefined, clientName: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order/client/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { serviceOrders } = await response.json()

    for (const serviceOrder of serviceOrders) {
        const hasTechnician = serviceOrder.technicianId ? true : false
        if (hasTechnician) {
            const technician = await getUserById(token, serviceOrder.technicianId);
            serviceOrder.technicianId = technician
        }
        serviceOrder.clientId = clientName
    }

    return serviceOrders
}