export const getProducts = async (token: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    const { products } = await response.json()
    return products
}