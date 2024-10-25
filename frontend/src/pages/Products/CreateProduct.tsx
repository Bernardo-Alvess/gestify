import { useCookies } from 'react-cookie';

import UserBlue from '../../public/assets/view-user-page/user-blue.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { createClient, ICreateClient } from '../../http/create-client';
import { toast } from 'sonner';

const CreateProduct = () => {
    const [cookies] = useCookies();
    const today = new Date().toLocaleDateString('pt-BR');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const client: ICreateClient = {
            name: formData.get('name')?.toString(),
            price: formData.get('price')?.toString(),
            cost: formData.get('cost')?.toString(),
            unityType: formData.get('unityType')?.toString(),
            minQtd: formData.get('minQtd')?.toString(),
            qtd: formData.get('qtd')?.toString(),
            companyId: formData.get('companyId')?.toString(),
        };

        const { id } = await createClient(cookies.jwt, client);

        if (!id) {
            toast.error('Erro ao criar produto');
            return;
        }

        toast.success('Produto adicionado');
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
                        <img src={UserBlue} alt="" />
                        <p className="font-bold text-xl">Adicionar novo produto ao sistema</p>
                    </div>
                    <form
                        id="create-client-form"
                        className="grid grid-cols-2 gap-6"
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
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                type="text"
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
                                type="text"
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
                                type="text"
                                name="qtd"
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold mb-1" htmlFor="minQtd">
                                    Estoque mínimo
                                </label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    type="text"
                                    name="minQtd"
                                />
                            </div>
                            <div></div>
                        </div>
                        <div className="col-span-2 flex justify-center mt-6">
                            <button
                                form="create-client-form"
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
