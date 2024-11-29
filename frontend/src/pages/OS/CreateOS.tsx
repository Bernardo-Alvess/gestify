import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { getUsers } from '../../http/get-users';
import { createSo } from '../../http/create-so';
import { toast } from 'sonner';
import { cleanProductSo, productSo } from '../../data/products-so';
import { createProductSo } from '../../http/create-product-service-order';
import SuccessModal from '../../components/sucess-modal';
import AddProductModal from '../../components/add-product-modal';

interface IUser {
	name: string;
	id: string;
	number: string;
}

interface IFormValues {
	client: string | undefined;
	technician: string | undefined;
	number: string;
	defect: string | undefined;
	report: string | undefined;
	description: string | undefined;
	extras: string | undefined;
	date: string;
}

export const CreateOS: React.FC = () => {
	const today = new Date().toLocaleDateString('pt-BR');
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [clients, setClients] = useState<IUser[]>([]);
	const [technicians, setTechnicians] = useState<IUser[]>([]);
	const [cookies] = useCookies(['jwt', 'id']);
	const [addProductModal, setAddProductModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);

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
		'Quantidade',
		'Custo',
		'Valor Total',
	];

	const handleChange = (
		e: ChangeEvent<
			HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
		>
	) => {
		let { name, value } = e.target;

		if (name === 'client') {
			const selectedClient = clients.find(
				(client) => client.id === value
			);
			if (selectedClient) {
				setFormValues((prevValues) => ({
					...prevValues,
					client: selectedClient.id,
					number: selectedClient.number,
				}));
			}
			return;
		}

		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const fetchClients = useCallback(async () => {
		const data = await getUsers(cookies.jwt, 'CLIENT', undefined);
		if (data !== clients) setClients(data);
	}, []);

	const fetchTechs = useCallback(async () => {
		const data = await getUsers(cookies.jwt, 'TECHNICIAN', undefined);
		if (data !== technicians) setTechnicians(data);
	}, []);

	useEffect(() => {
		fetchClients();
		fetchTechs();
	}, [fetchClients, fetchTechs]);

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const id = await createSo(cookies.jwt, {
			description:
				formValues.description === ''
					? undefined
					: formValues.description,
			defect: formValues.defect === '' ? undefined : formValues.defect,
			report: formValues.report === '' ? undefined : formValues.report,
			extras: formValues.extras === '' ? undefined : formValues.extras,
			status: selectedOption.toUpperCase(),
			number: formValues.number === '' ? undefined : formValues.number,
			//date: formValues.date,
			userId: cookies.id,
			clientId: formValues.client === '' ? undefined : formValues.client,
			technicianId:
				formValues.technician === ''
					? undefined
					: formValues.technician,
		});

		if (id) {
			productSo.forEach((product) => {
				createProductSo(cookies.jwt, {
					productId: product.productId,
					serviceOrderId: id,
					qtd: product.qtd,
				});
			});
			cleanProductSo();
			toast.success('Ordem de serviço criada!');
			setSuccessModal(true);
			return;
		}else if(selectedOption == ""){
			toast.error('Selecione um status');
		}else{
			toast.error('Erro ao criar Ordem de Serviço');
		}
		
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<SuccessModal
				toggle={successModal}
				onClose={() => {
					setSuccessModal(false);
				}}
				message={'Ordem de serviço criada com sucesso'}
			/>
			<AddProductModal
				toggle={addProductModal}
				onClose={() => setAddProductModal(false)}
			/>
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
				<header className="flex justify-between mb-5">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">
							Ordens - Adicionar
						</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<BackPageButton route="/orders" />

				<form
					id="create-os-form"
					onSubmit={handleSubmit}
					className="bg-white p-4 rounded-lg shadow-lg w-full"
				>
					<div className="flex justify-between mb-4">
						<h2 className="font-bold text-lg mb-4">
							Criar Ordem de Serviço
						</h2>
						<select
							className={`font-bold px-4 py-2 rounded-lg ${getSelectClass()}`}
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
						>
							<option value="">Status</option>
							<option value="ABERTO">Aberto</option>
							<option value="EM ANDAMENTO">Em Andamento</option>
							<option value="PENDENTE">Pendente</option>
							<option value="FECHADO">Fechado</option>
							<option value="CANCELADO">Cancelado</option>
						</select>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="col-span-8 grid grid-cols-2 gap-2">
							{[
								{
									label: 'Cliente',
									name: 'client',
									options: [...clients],
								},
								{
									label: 'Técnico Responsável',
									name: 'technician',
									options: [...technicians],
								},
								{ label: 'Telefone', name: 'number' },
								{
									label: 'Data de abertura',
									name: 'date',
									type: 'date',
								},
								{
									label: 'Descrição',
									name: 'description',
									isTextarea: true,
								},
								{
									label: 'Defeito',
									name: 'defect',
									isTextarea: true,
								},
								{
									label: 'Laudo técnico',
									name: 'report',
									isTextarea: true,
								},
								{
									label: 'Observações',
									name: 'extras',
									isTextarea: true,
								},
							].map((field, index) => (
								<div key={index}>
									<label className="block text-sm font-bold">
										{field.label}
									</label>
									{field.isTextarea ? (
										<textarea
											name={field.name}
											value={formValues[
												field.name as keyof IFormValues
											]?.toString()}
											onChange={handleChange}
											rows={6}
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									) : field.options ? (
										<select
											name={field.name}
											value={formValues[
												field.name as keyof IFormValues
											]?.toString()}
											onChange={handleChange}
											className="font-medium px-4 py-2 rounded-lg w-full border border-gray-300"
										>
											<option
												value=""
												className="text-gray-400"
											>
												Escolha um{' '}
												{field.label.toLowerCase()}
											</option>
											{field.options.map((option) => (
												<option
													key={option.id}
													value={option.id}
												>
													{option.name}
												</option>
											))}
										</select>
									) : (
										<input
											type={field.type || 'text'}
											name={field.name}
											value={formValues[
												field.name as keyof IFormValues
											]?.toString()}
											required
											onChange={handleChange}
											className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
										/>
									)}
								</div>
							))}
						</div>
						<div className="col-span-4 border rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
							<Table
								icon={IconProductsBlack}
								title={'Adicionar Produtos a Ordem de Serviço'}
								columns={columns}
								data={productSo}
								actions={{
									showActions: true,
									actionButtonText: 'Adicionar Produto',
									action: () => {
										setAddProductModal(true);
									},
									deleteAction: () => { },
								}}
							/>
						</div>
					</div>
					<div className="flex justify-center mt-6">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-lg"
						>
							Criar Ordem de Serviço
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};
