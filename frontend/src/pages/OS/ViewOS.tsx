import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { getServiceOrdersById } from '../../http/get-service-order-by-id';
import { useParams } from 'react-router-dom';
import { getProductsForSo } from '../../http/get-products-for-so';

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
	const { id } = useParams();
	const today = new Date().toLocaleDateString('pt-BR');
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [products, setProducts] = useState([{}]);
	const [cookies] = useCookies(['jwt', 'id']);
	const [totalValue, setTotalValue] = useState(0);

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

	const columns = [
		'Código',
		'Nome',
		'Preço',
		'Custo',
		'Tipo UN',
		'QTD',
		'Id Relação',
		'Valor Total',
	];

	const fetchServiceOrder = useCallback(async () => {
		const data = await getServiceOrdersById(cookies.jwt, id);
		setFormValues({
			client: data.clientId || '',
			technician: data.technicianId || '',
			number: data.number || '',
			defect: data.defect || '',
			report: data.report || '',
			description: data.description || '',
			extras: data.extras || '',
			date: new Date(data.date).toLocaleDateString('pt-BR'),
		});
		setSelectedOption(data.status);
	}, []);

	const fetchProductsForOs = useCallback(async () => {
		const { productsForOs } = await getProductsForSo(cookies.jwt, id);

		if (productsForOs !== undefined) {
			setProducts(productsForOs);
			const total = productsForOs.reduce(
				(sum: any, product: any) => sum + (product.totalValue || 0),
				0
			);
			setTotalValue(total); 
		}
	}, []);

	useEffect(() => {
		fetchServiceOrder();
		fetchProductsForOs();
	}, [fetchServiceOrder, fetchProductsForOs]);

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
									value: formValues.number,
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
							<div className='pt-5'>
								<span className='font-semibold'>Valor Total:</span>
								<span> R${totalValue}</span>
							</div>
						</div>
						<div className="col-span-4 border rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
							<Table
								icon={IconProductsBlack}
								title={
									'Produtos Relacionados a Ordem de Serviço'
								}
								columns={columns}
								data={products}
								actions={{
									showActions: false,
									actionButtonText: '',
									action: () => {
										alert('teste');
									},
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
