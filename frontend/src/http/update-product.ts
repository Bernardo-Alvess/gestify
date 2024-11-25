import { IUpdateProduct } from "../pages/Products/EditProduct";

export const updateProduct = async (token: string, id: string | undefined, data: IUpdateProduct) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.message || 'Erro desconhecido ao atualizar o produto' };
        }

        const updatedProduct = await response.json();
        return { updated: updatedProduct };
    } catch (err) {
        return { error: 'Erro de conexão com o servidor' };
    }
};