import { useCookies } from 'react-cookie';

import IconProductBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { createProduct, ICreateProduct } from '../../http/create-product';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [cookies] = useCookies();
    const today = new Date().toLocaleDateString('pt-BR');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const product: ICreateProduct = {
            name: formData.get('name')?.toString() ?? '',
            price: parseFloat(formData.get('price')?.toString() ?? '0'),
            cost: formData.get('cost') ? parseFloat(formData.get('cost')?.toString() ?? '0') : null,
            unityType: formData.get('unityType')?.toString() || null,
            minQtd: formData.get('minQtd') ? parseInt(formData.get('minQtd')?.toString() ?? '0') : null,
            qtd: formData.get('qtd') ? parseInt(formData.get('qtd')?.toString() ?? '0') : null,
            companyId: cookies.companyId || '',
        };
    
        const { success, error } = await createProduct(cookies.jwt, product);
    
        if (!success) {
            toast.error(`Erro ao criar produto: ${error ? error.message || error : "Erro desconhecido"}`);
            return;
        }
    
        toast.success('Produto adicionado');
        navigate('/products');
    };
    

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
                <header className="flex justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Produtos - Adicionar</h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <TopNav />
                </header>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-4 mb-6">
                        <img src={IconProductBlack} alt="Ícone Produto" />
                        <p className="font-bold text-xl">Adicionar novo produto ao sistema</p>
                    </div>
                    <form
                        id="create-product-form"
                        className="grid grid-cols-2 py-14 px-32 gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="name">
                                Nome
                            </label>
                            <input
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="text"
                                name="name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="cost">
                                Custo
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="cost"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="price">
                                Preço
                            </label>
                            <input
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="price"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="unityType">
                                Tipo (kg, un, caixa)
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="text"
                                name="unityType"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="qtd">
                                Quantidade
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="qtd"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="minQtd">
                                Estoque mínimo
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="number"
                                name="minQtd"
                            />
                        </div>
                        <div className="col-span-2 flex justify-center mt-6">
                            <button
                                form="create-product-form"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                type="submit"
                            >
                                Adicionar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export { CreateProduct };
