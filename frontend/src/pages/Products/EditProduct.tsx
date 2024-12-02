import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import { getProductByIdUpdate } from '../../http/get-productById-update';
import { updateProduct } from '../../http/update-product';
import { BackPageButton } from '../../components/back-page-button';

export interface IUpdateProduct {
    name?: string | null | undefined;
    price?: number | null | undefined;
    cost?: number | null | undefined;
    unityType?: string | null | undefined;
    minQtd?: number | null | undefined;
    qtd?: number | null | undefined;
}

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IUpdateProduct | null>(null);
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('pt-BR');

    const fetchProduct = useCallback(async () => {
        const data = await getProductByIdUpdate(cookies.jwt, id);
        if (data !== product) setProduct(data);
    }, [cookies.jwt, id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) =>
            prevProduct ? { ...prevProduct, [name]: value } : null
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const product: IUpdateProduct = {
            name: formData.get('name')?.toString(),
            price: formData.get('price')
                ? parseFloat(formData.get('price')!.toString())
                : undefined,
            cost: formData.get('cost')
                ? parseFloat(formData.get('cost')!.toString())
                : undefined,
            unityType: formData.get('unityType')?.toString(),
            minQtd: formData.get('minQtd')
                ? parseInt(formData.get('minQtd')!.toString(), 10)
                : undefined,
            qtd: formData.get('qtd')
                ? parseInt(formData.get('qtd')!.toString(), 10)
                : undefined,
        };

        if (product?.name && product.name.length < 2) {
            toast.error('O nome do produto deve ter pelo menos 2 caracteres.');
            return;
        }

        if (typeof product.price === 'number' && product.price < 0) {
            toast.error('O preço não pode ser negativo.');
            return;
        }

        if (typeof product.cost === 'number' && product.cost < 0) {
            toast.error('O custo não pode ser negativo.');
            return;
        }

        const result = await updateProduct(cookies.jwt, id, product);

        if (result == false) {
            toast.error(`Erro ao atualizar o produto`);
        } else {
            toast.success('Produto atualizado com sucesso!');
            navigate('/products');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
                <header className="flex justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Produtos - Alterar
                        </h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <TopNav />
                </header>

                <BackPageButton route="/orders" />

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-4 mb-6">
                        <p className="font-bold text-xl">
                            Alterar Produto: {product?.name || 'N/A'}
                        </p>
                    </div>
                    <form
                        id="edit-product-form"
                        className="grid grid-cols-2 py-14 px-32 gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="name"
                            >
                                Nome
                            </label>
                            <input
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="text"
                                name="name"
                                onChange={handleInputChange}
                                value={product?.name || ''}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="price"
                            >
                                Preço
                            </label>
                            <input
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="price"
                                onChange={handleInputChange}
                                value={product?.price || ''}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="cost"
                            >
                                Custo
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="cost"
                                onChange={handleInputChange}
                                value={product?.cost || ''}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="unityType"
                            >
                                Tipo (kg, un, caixa)
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="text"
                                name="unityType"
                                onChange={handleInputChange}
                                value={product?.unityType || ''}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="minQtd"
                            >
                                Estoque mínimo
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="minQtd"
                                onChange={handleInputChange}
                                value={product?.minQtd || ''}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-bold mb-1"
                                htmlFor="qtd"
                            >
                                Quantidade
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="qtd"
                                onChange={handleInputChange}
                                value={product?.qtd || ''}
                            />
                        </div>
                        <div className="col-span-2 flex justify-center mt-6">
                            <button
                                form="edit-product-form"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                type="submit"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProduct;
