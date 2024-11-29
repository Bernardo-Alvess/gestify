export const deleteClient = async (token: string, clientId: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${clientId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json(); 
};