export const getServiceOrders = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { serviceOrders } = await response.json()
    return serviceOrders
}