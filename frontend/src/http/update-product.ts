import { IUpdateProduct } from "../pages/Products/EditProduct";

export const updateProduct = async (token: string, id: string | undefined, data: IUpdateProduct) => {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) return true;

        return false;
};