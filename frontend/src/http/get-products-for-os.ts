interface Product {
    id: string;
    name: string;
    price: number;
    cost: number;
    unityType: string;
    minQtd: number;
    qtd: number;
    companyId: string
    // Excluímos minQtd, qtd e companyId
}

export const getProductsForOs = async (token: string, id: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product-service-order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        },
    })

    const data = await response.json()

    const productsForOs = data.map(({ minQtd, qtd, companyId, ...resto }: Product) => resto);

    return { productsForOs }
}