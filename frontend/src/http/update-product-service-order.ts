export const updateProductServiceOrder = async (
    token: string,
    id: string | undefined,
    serviceOrderId: string | undefined,
    productId: string | undefined,
    qtd: number | undefined
) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product-service-order/${id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serviceOrderId, productId, qtd }),
        }
    );

    if (response.ok) return true;

    return false;
};