import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import DetailsTable from '../../components/table-details';
import { BackPageButton } from '../../components/back-page-button';
import { useNavigate } from 'react-router-dom';

export const CreateOS = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    const navigate = useNavigate();

    const column_table_2 = ['Código', 'Nome', 'Quantidade', 'Marca'];
    const data_table_2 = Array(12).fill(['123', 'Placa Mãe', '2', 'Asus']);

    const add = () => {
		navigate('/createos');
	};

    const fields = [
        { label: 'Cliente', value: '', },
        { label: 'Técnico Responsável', value: '', },
        { label: 'Telefone', value: '', },
        { label: 'Data de abertura', value: '', },
        { label: 'Descrição', value: '', placeholder: 'Digite aqui...', isTextarea: true, },
        { label: 'Defeito', value: '', placeholder: 'Digite aqui...', isTextarea: true, },
        { label: 'Laudo técnico', value: '', placeholder: 'Digite aqui...', isTextarea: true, },
        { label: 'Observações', value: '', placeholder: 'Digite aqui...', isTextarea: true, },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
                <header className="flex justify-between mb-5">
                    <div className="pt-16 md:pt-16 lg:pt-0">
                        <h1 className="text-2xl font-bold">Ordens - Adicionar</h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <SearchBox />
                    <TopNav />
                </header>

                <BackPageButton route="/orders" />

                <DetailsTable
					fields={fields}
					orderId="123"
					extraComponent={
						<Table
							icon={IconProductsBlack}
							title="Produtos utilizados na ordem"
							columns={column_table_2}
							data={data_table_2}
							actions={{
								showActions: true,
								actionButtonText: 'Add Produto',
								action: add,
								deleteAction: () => {},
							}}
						/>
					}
                    textButton="Adicionar Ordem"
                />
            </main>
        </div>
    );
};


