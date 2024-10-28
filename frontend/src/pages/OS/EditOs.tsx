import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { getUsers } from '../../http/get-users';
import { toast } from 'sonner';
import { getServiceOrdersById } from '../../http/get-service-order-by-id';
import { useParams } from 'react-router-dom';
import { updateServiceOrder } from '../../http/update-service-order';

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

export interface IUpdateServiceOrder {
	description?: string | undefined;
	defect?: string | undefined;
	report?: string | undefined;
	extras?: string | undefined;
	status: string;
	technicianId?: string | undefined;
	clientId?: string | undefined;
}

export const EditOs: React.FC = () => {
	const today = new Date().toLocaleDateString('pt-BR');
	const { id } = useParams();
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [clients, setClients] = useState<IUser[]>([]);
	const [technicians, setTechnicians] = useState<IUser[]>([]);
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
			inputFields[0].selected = selectedClient;
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

	const fetchServiceOrder = useCallback(async () => {
		const data = await getServiceOrdersById(cookies.jwt, id);
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
		console.log(data);
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formValues.technician == inputFields[1].selected?.name) {
			formValues.technician = inputFields[1].selected?.id;
		}

		console.log({
			description:
				formValues.description === ''
					? undefined
					: formValues.description,
			defect: formValues.defect === '' ? undefined : formValues.defect,
			report: formValues.report === '' ? undefined : formValues.report,
			extras: formValues.extras === '' ? undefined : formValues.extras,
			status: selectedOption.toUpperCase(),
			//date: formValues.date,
			clientId: formValues.client === '' ? undefined : formValues.client,
			technicianId:
				formValues.technician === ''
					? undefined
					: formValues.technician,
		});

		const updated = await updateServiceOrder(cookies.jwt, id, {
			description:
				formValues.description === ''
					? undefined
					: formValues.description,
			defect: formValues.defect === '' ? undefined : formValues.defect,
			report: formValues.report === '' ? undefined : formValues.report,
			extras: formValues.extras === '' ? undefined : formValues.extras,
			status: selectedOption.toUpperCase(),
			//date: formValues.date,
			clientId: formValues.client === '' ? undefined : formValues.client,
			technicianId:
				formValues.technician === ''
					? undefined
					: formValues.technician,
		});

		if (updated) {
			toast.success('Ordem de Serviço editada');
			return;
		}

		toast.error('Erro ao editar Ordem de Serviço');
	};

	useEffect(() => {
		fetchClients();
		fetchTechs();
		fetchServiceOrder();
	}, [fetchClients, fetchTechs, fetchServiceOrder]);

	const inputFields = [
		{
			label: 'Cliente',
			name: 'client',
			options: [...clients],
			selected: clients.find(
				(client) => client.name == formValues.client
			),
		},
		{
			label: 'Técnico Responsável',
			name: 'technician',
			options: [...technicians],
			selected: technicians.find(
				(tech) => tech.name == formValues.technician
			),
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
	];

	console.log(inputFields);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
				<header className="flex justify-between mb-5">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Ordens - Editar</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox />
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
							{inputFields.map((field, index) => (
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
											{field.selected ? (
												<option
													value={field.selected.id}
													className="text-gray-400"
												>
													{field.selected.name}
												</option>
											) : (
												<option
													value=""
													className="text-gray-400"
												>
													Escolha um{' '}
													{field.label.toLowerCase()}
												</option>
											)}

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
								columns={column_table_2}
								data={data_table_2}
								actions={{
									showActions: true,
									actionButtonText: 'Adicionar Produto',
									action: () => {},
									deleteAction: () => {},
								}}
							/>
						</div>
					</div>
					<div className="flex justify-center mt-6">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-lg"
						>
							Editar Ordem de Serviço
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};
