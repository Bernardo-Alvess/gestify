export const getProductById = async (token: string, id: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar produto: ${response.statusText}`);
        }

        const product = await response.json();
        return product;
    } catch (error) {
        throw error;
    }
};
