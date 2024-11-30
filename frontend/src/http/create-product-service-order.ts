interface ICreateProductSo {
    productId: string | undefined;
    serviceOrderId: string | undefined;
    qtd: number | undefined;
}

export const createProductSo = async (token: string, data: ICreateProductSo) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/product-service-order/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    if (response.ok) return true

    return false
}