import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import { getProductByIdUpdate } from '../../http/get-productById-update';
import { updateProduct } from '../../http/update-product';

export interface IUpdateProduct {
    name?: string | null | undefined;
    price?: number | null | undefined;
    cost?: number | null | undefined;
    unityType?: string | null | undefined;
    minQtd?: number | null | undefined;
    qtd?: number | null | undefined;
}

const EditProduct = () => {
    const {id} = useParams();
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
            price: formData.get('price') ? parseFloat(formData.get('price')!.toString()) : undefined,
            cost: formData.get('cost') ? parseFloat(formData.get('cost')!.toString()) : undefined,
            unityType: formData.get('unityType')?.toString(),
            minQtd: formData.get('minQtd') ? parseInt(formData.get('minQtd')!.toString(), 10) : undefined,
            qtd: formData.get('qtd') ? parseInt(formData.get('qtd')!.toString(), 10) : undefined,
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
        <main className="flex flex-col flex-1 p-10 bg-blue-200 space-y-10 h-screen">
            <header className="flex justify-between">
                <div className="pt-16 md:pt-16 lg:pt-0">
                    <h1 className="text-2xl font-bold">Produtos</h1>
                    <p className="text-sm text-gray-500">{today}</p>
                </div>
                <TopNav />
            </header>
            <div className="flex flex-col gap-10 self-center h-5/6 w-fit bg-white overflow-y-auto rounded-lg shadow-xl p-2 overflow-x-hidden">
                <div className="flex p-2 w-full h-16 items-center gap-2 border-b border-black border-opacity-10">
                    <p className="text-bold text-xl">
                        Alterar Produto: {product?.name ? product.name : 'N/A'}
                    </p>
                </div>
                <div className="flex flex-col gap-10">
                    <form
                        id="edit-product-form"
                        className="col-span-4 flex"
                        onSubmit={handleSubmit}
                    >
                        <div className="p-3 flex flex-col gap-12">
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="name"
                                >
                                    Nome
                                </label>
                                <input
                                    required
                                    className="p-1 border rounded-lg"
                                    type="text"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={product?.name || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="price"
                                >
                                    Preço
                                </label>
                                <input
                                    required
                                    className="p-1 border rounded-lg"
                                    type="number"
                                    name="price"
                                    onChange={handleInputChange}
                                    value={product?.price || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="cost"
                                >
                                    Custo
                                </label>
                                <input
                                    className="p-1 border rounded-lg"
                                    type="number"
                                    name="cost"
                                    onChange={handleInputChange}
                                    value={product?.cost || ''}
                                />
                            </div>
                        </div>
                        <div className="p-3 flex flex-col gap-12">
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="unityType"
                                >
                                    Unidade
                                </label>
                                <input
                                    className="p-1 border rounded-lg"
                                    type="text"
                                    name="unityType"
                                    onChange={handleInputChange}
                                    value={product?.unityType || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="minQtd"
                                >
                                    Quantidade Mínima
                                </label>
                                <input
                                    className="p-1 border rounded-lg"
                                    type="number"
                                    name="minQtd"
                                    onChange={handleInputChange}
                                    value={product?.minQtd || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-fit">
                                <label
                                    className="font-bold text-md"
                                    htmlFor="qtd"
                                >
                                    Quantidade Atual
                                </label>
                                <input
                                    className="p-1 border rounded-lg"
                                    type="number"
                                    name="qtd"
                                    onChange={handleInputChange}
                                    value={product?.qtd || ''}
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        form="edit-product-form"
                        className="self-center bg-primary p-2 w-60 h-11 rounded-lg text-white font-bold"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </main>
    </div>
    
    );
};

export default EditProduct;
