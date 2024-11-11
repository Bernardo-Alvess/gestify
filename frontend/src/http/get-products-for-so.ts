interface Product {
    id: string;
    name: string;
    price: number;
    cost: number;
    unityType: string;
    qtd: number;
    minQtd: number;
    companyId: string
    // Excluímos minQtd, qtd e companyId
}

export const getProductsForSo = async (token: string, id: string | undefined) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product-service-order/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        },
    })

    const data = await response.json()

    const productsForOs = data.map(({ minQtd, companyId, ...resto }: Product) => ({
        ...resto,
        totalValue: (resto.price ?? 0) * (resto.qtd ?? 0)
    }));
    console.log(productsForOs)

    return { productsForOs }
}