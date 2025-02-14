export const deleteProductSo = async (
    token: string,
    id: string | undefined,
    serviceOrderId: string | undefined
) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/product-service-order/${id}/${serviceOrderId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adicione o Content-Type para JSON
        },
        // body: serviceOrderId ? JSON.stringify(serviceOrderId) : null, // Somente envie o body se não for undefined
        credentials: 'include'
    });

    if (response.ok) {
        return true;
    }

    return false;
};
