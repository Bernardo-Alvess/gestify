export interface IProduct {
    id: string;
    name: string;
    price: number;
    cost: number;
    unityType: string;
    minQtd: number;
    qtd: number;
    companyID: string;
}

export const getProductByIdUpdate = async (token: string, id: string | undefined): Promise<IProduct> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro ao buscar produto: ${response.statusText}`);
    }

    const { product } = await response.json();
    return product;
};