export const getProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product`)
    const { products } = await response.json()
    return products
}