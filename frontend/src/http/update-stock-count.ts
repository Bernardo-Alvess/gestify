export const updateStockCount = async (
    token: string,
    id: string | undefined,
    _qtd: number | undefined
) => {
    console.log('fiunmc ')
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product/stock/${id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _qtd }),
        }
    );

    if (response.ok) return true;

    return false;
};
