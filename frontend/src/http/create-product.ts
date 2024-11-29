export interface ICreateProduct {
    name: string;
    price: number;
    cost?: number | null;
    unityType?: string | null;
    minQtd?: number | null;
    qtd?: number | null;
    companyId: string;
}

export const createProduct = async (token: string, data: ICreateProduct) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro no backend:", errorData);
            return { success: false, error: errorData };
        }

        return { success: true, error: null };

    } catch (error) {
        console.error("Erro de conexão:", error);
        return { success: false, error };
    }
};

