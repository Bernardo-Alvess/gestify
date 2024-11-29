export const deleteProduct = async (token: string, productId: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json(); 
};