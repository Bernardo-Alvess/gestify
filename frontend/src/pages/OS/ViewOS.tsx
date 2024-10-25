import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { getServiceOrders } from '../../http/get-service-orders';

interface IFormValues {
    client: string;
    technician: string;
    number: string;
    defect: string;
    report: string;
    description: string;
    extras: string;
    date: string;
}

export const ViewOS: React.FC = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [cookies] = useCookies(['jwt', 'id']);

    const [formValues, setFormValues] = useState<IFormValues>({
        client: '',
        technician: '',
        number: '',
        defect: '',
        report: '',
        description: '',
        extras: '',
        date: today,
    });

    const column_table_2 = ['Código', 'Nome', 'Quantidade', 'Marca'];
    const data_table_2 = Array(20).fill(['123', 'Placa Mãe', '2', 'Asus']);

    const fetchServiceOrder = useCallback(async () => {
        const data = await getServiceOrders(cookies.jwt); 
        setFormValues({
            client: data.clientId || '',
            technician: data.technicianId || '',
            number: data.clientNumber || '', 
            defect: data.defect || '',
            report: data.report || '',
            description: data.description || '',
            extras: data.extras || '',
            date: new Date(data.date).toLocaleDateString('pt-BR'),
        });
        setSelectedOption(data.status);
    }, [cookies.jwt]);

    useEffect(() => {
        fetchServiceOrder();
    }, [fetchServiceOrder]);

    const getSelectClass = (): string => {
        switch (selectedOption) {
            case 'EM ANDAMENTO':
                return 'bg-green-100 text-green-400 border border-green-400';
            case 'PENDENTE':
                return 'bg-yellow-100 text-yellow-600 border border-yellow-600';
            case 'FECHADO':
                return 'bg-blue-100 text-blue-600 border border-blue-400';
            case 'CANCELADO':
                return 'bg-red-200 text-red-600 border border-red-600';
            case 'ABERTO':
                return 'bg-purple-200 text-purple-600 border-purple-600';
            default:
                return '';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
                <header className="flex justify-between mb-5">
                    <div className="pt-16 md:pt-16 lg:pt-0">
                        <h1 className="text-2xl font-bold">
                            Ordens - Visualizar
                        </h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <SearchBox />
                    <TopNav />
                </header>

                <BackPageButton route="/orders" />

                <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-bold text-lg mb-4">
                            Ordem de Serviço N°
                        </h2>
                        <span
                            className={`font-bold px-4 py-2 rounded-lg ${getSelectClass()}`}
                        >
                            {selectedOption || 'Status'}
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-8 grid grid-cols-2 gap-2">
                            {[
                                {
                                    label: 'Cliente',
                                    value: formValues.client,
                                },
                                {
                                    label: 'Técnico Responsável',
                                    value: formValues.technician,
                                },
                                {
                                    label: 'Telefone',
                                    value: formValues.number
                                },
                                {
                                    label: 'Data de abertura',
                                    value: formValues.date,
                                },
                                {
                                    label: 'Descrição',
                                    value: formValues.description,
                                    isTextarea: true,
                                },
                                {
                                    label: 'Defeito',
                                    value: formValues.defect,
                                    isTextarea: true,
                                },
                                {
                                    label: 'Laudo técnico',
                                    value: formValues.report,
                                    isTextarea: true,
                                },
                                {
                                    label: 'Observações',
                                    value: formValues.extras,
                                    isTextarea: true,
                                },
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-bold">
                                        {field.label}
                                    </label>
                                    {field.isTextarea ? (
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-lg h-52 max-h-64"
                                            value={field.value || ''}
                                            readOnly
                                            rows={6} 
                                        />
                                    ) : (
                                        <p className="w-full p-2 border border-gray-300 rounded-lg max-h-12">
                                            {field.value || '\u00A0'}
                                        </p>
                                    )}
                                </div>

                            ))}
                        </div>
                        <div className="col-span-4 border rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
                            <Table
                                icon={IconProductsBlack}
                                title={'Produtos Relacionados a Ordem de Serviço'}
                                columns={column_table_2}
                                data={data_table_2}
                                actions={{
                                    showActions: false,
                                    actionButtonText: '',
                                    action: () => { },
                                    deleteAction: () => { },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
