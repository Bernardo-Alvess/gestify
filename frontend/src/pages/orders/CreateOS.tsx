import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import IconBackBlue from '../../public/assets/home-page/icons/generic/back_icon_b.svg';
import DetailsTable from '../../components/table-details';

export const CreateOS = () => {
    const today = new Date().toLocaleDateString('pt-BR');

    const column_table_2 = ['Código', 'Nome', 'Quantidade', 'Marca'];

    const data_table_2 = Array(12).fill(['123', 'Placa Mãe', '2', 'Asus']);

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

                <div className="flex justify-start">
                    <button
                        className="bg-white p-2 rounded-lg"
                        onClick={() => { }}
                    >
                        <img className="w-4" src={IconBackBlue} alt="" />
                    </button>
                </div>

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
                                showActions: false,
                                actionButtonText: '',
                                action: () => { },
                            }}
                        />
                    }
                    textButton="Adicionar Ordem"
                />
            </main>
        </div>
    );
};