export const getProductsForOs = async (token: string, id: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product-service-order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    const { products } = await response.json()
    return { products }
}