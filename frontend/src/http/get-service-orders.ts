export const getServiceOrders = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order`)
    const { serviceOrders } = await response.json()
    return serviceOrders
}