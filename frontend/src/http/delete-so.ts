export const deleteSo = async (token: string, serviceOrderId: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/service-order/${serviceOrderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json(); 
};