import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import IconProductBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import TopNav from '../../components/top-nav';
import { getProductById } from '../../http/get-product-by-id';
import Sidebar from '../../components/sidebar';
import { BackPageButton } from '../../components/back-page-button';

interface Product {
    id: string;
    name: string;
    price: number;
    cost?: number | null;
    unityType?: string | null;
    minQtd?: number | null;
    qtd?: number | null;
    companyId: string;
    createdAt: string;
}

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [cookies] = useCookies();
    const today = new Date().toLocaleDateString('pt-BR');

    const fetchProduct = useCallback(async () => {
        if (!id) return;

        try {
            const data = await getProductById(cookies.jwt, id);
            setProduct(data.product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    }, [cookies.jwt, id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-6 bg-blue-200 space-y-6 h-screen">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Produto - Visualizar</h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <TopNav />
                </header>

                <BackPageButton route="/products" />

                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="flex gap-2 border-b pb-3 border-gray-300">
                        <img src={IconProductBlack} className="w-6" alt="Ícone Produto" />
                        <h2 className="font-semibold text-lg">{product?.name || 'N/A'}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-14 px-32">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Nome</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.name || 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Preço</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.price ? `R$ ${product.price.toFixed(2)}` : 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Custo</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.cost != null ? `R$ ${product.cost.toFixed(2)}` : 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Tipo</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.unityType || 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Quantidade</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.qtd != null ? product.qtd.toString() : 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Quantidade Mínima</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.minQtd != null ? product.minQtd.toString() : 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-black">Empresa</label>
                            <input
                                type="text"
                                readOnly
                                value={product?.companyId || 'N/A'}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export { ViewProduct };
