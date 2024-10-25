import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import TopNav from '../../components/top-nav';
import IconProductsBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { BackPageButton } from '../../components/back-page-button';
// import { useNavigate } from 'react-router-dom';
// import { ChangeEvent, useCallback, useEffect, useState } from 'react';
// import Table from '../../components/table';
// import { getUsers } from '../../http/get-users';
// import { useCookies } from 'react-cookie';

interface IUser {
	name: string;
	id: string;
	number: string;
}

// export const CreateOS = () => {
// 	const today = new Date().toLocaleDateString('pt-BR');

// 	const [selectedOption, setSelectedOption] = useState('');
// 	const [clients, setClients] = useState<IUser[]>([]);
// 	const [technicians, setTechnicians] = useState<IUser[]>([]);
// 	const [cookies] = useCookies(['jwt']);

// 	//Dados que vão vir do formulário
// 	// const [client, setClient] = useState<IUser>();
// 	// const [technician, setTechnician] = useState<IUser>();
// 	// const [number, setNumber] = useState(client?.number);
// 	// const [defect, setDefect] = useState('');
// 	// const [report, setReport] = useState('');
// 	// const [description, setDescription] = useState('');
// 	// const [extras, setExtras] = useState('');

// 	const [formValues, setFormValues] = useState({
// 		client: '',
// 		technician: '',
// 		number: '',
// 		defect: '',
// 		report: '',
// 		description: '',
// 		extras: '',
// 		date: today, // Data de abertura
// 	});

// 	const handleChange = (
// 		e: ChangeEvent<
// 			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
// 		>
// 	) => {
// 		const { name, value } = e.target;
// 		setFormValues((prevValues) => ({
// 			...prevValues,
// 			[name]: value,
// 		}));
// 	};

// 	const navigate = useNavigate();

// 	const column_table_2 = ['Código', 'Nome', 'Quantidade', 'Marca'];
// 	const data_table_2 = Array(12).fill(['123', 'Placa Mãe', '2', 'Asus']);

// 	const add = () => {
// 		navigate('/createos');
// 	};

// 	const handleStatusSelect = (
// 		event: React.ChangeEvent<HTMLSelectElement>
// 	) => {
// 		setSelectedOption(event.target.value.toUpperCase());
// 		console.log(selectedOption);
// 	};

// 	const handleClientSelect = (
// 		event: React.ChangeEvent<HTMLSelectElement>
// 	) => {
// 		const id = event.target.value;
// 		const selectedClient = clients.find((client) => client.id === id);
// 		setClient(selectedClient);
// 		console.log(selectedClient);
// 	};

// 	const handleTechSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
// 		const id = event.target.value;
// 		const selectedTech = technicians.find((tech) => tech.id === id);
// 		setTechnician(selectedTech);
// 		console.log(selectedTech);
// 	};

// 	const fields = [
// 		{
// 			label: 'Cliente',
// 			value: '',
// 			isSelect: true,
// 			values: [...clients],
// 			onChange: handleClientSelect,
// 		},
// 		{
// 			label: 'Técnico Responsável',
// 			value: '',
// 			isSelect: true,
// 			values: [...technicians],
// 			onChange: handleTechSelect,
// 		},
// 		{
// 			label: 'Telefone',
// 			value: client?.number,
// 			handleChange: () => {
// 				setNumber(client?.number);
// 			},
// 		},
// 		{ label: 'Data de abertura', value: '' },
// 		{
// 			label: 'Descrição',
// 			value: '',
// 			placeholder: 'Digite aqui...',
// 			isTextarea: true,
// 		},
// 		{
// 			label: 'Defeito',
// 			value: '',
// 			placeholder: 'Digite aqui...',
// 			isTextarea: true,
// 		},
// 		{
// 			label: 'Laudo técnico',
// 			value: '',
// 			placeholder: 'Digite aqui...',
// 			isTextarea: true,
// 		},
// 		{
// 			label: 'Observações',
// 			value: '',
// 			placeholder: 'Digite aqui...',
// 			isTextarea: true,
// 		},
// 	];

// 	const getSelectClass = () => {
// 		switch (selectedOption) {
// 			case 'EM ANDAMENTO':
// 				return 'bg-green-100 text-green-400 border border-green-400';
// 			case 'PENDENTE':
// 				return 'bg-yellow-100 text-yellow-600 border border-yellow-600';
// 			case 'FECHADO':
// 				return 'bg-blue-100 text-blue-600 border border-blue-400';
// 			case 'CANCELADO':
// 				return 'bg-red-200 text-red-600 border border-red-600';
// 			default:
// 				return '';
// 		}
// 	};

// 	const fetchClients = useCallback(async () => {
// 		const data = await getUsers(cookies.jwt, 'CLIENT', undefined);
// 		if (data !== clients) {
// 			setClients(data);
// 		}
// 	}, []);

// 	const fetchTechs = useCallback(async () => {
// 		const data = await getUsers(cookies.jwt, 'TECHNICIAN', undefined);
// 		if (data !== technicians) setTechnicians(data);
// 	}, []);

// 	useEffect(() => {
// 		fetchClients();
// 		fetchTechs();
// 	}, [fetchClients, fetchTechs]);

// 	return (
// 		<div className="flex h-screen overflow-hidden">
// 			<Sidebar />
// 			<main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
// 				<header className="flex justify-between mb-5">
// 					<div className="pt-16 md:pt-16 lg:pt-0">
// 						<h1 className="text-2xl font-bold">
// 							Ordens - Adicionar
// 						</h1>
// 						<p className="text-sm text-gray-500">{today}</p>
// 					</div>
// 					<SearchBox />
// 					<TopNav />
// 				</header>

// 				<BackPageButton route="/orders" />

// 				<div className="bg-white p-4 rounded-lg shadow-lg w-full">
// 					<div className="flex justify-between mb-4">
// 						<h2 className="font-bold text-lg mb-4">
// 							Criar Ordem de Serviço
// 						</h2>
// 						<select
// 							className={`font-bold px-4 py-2 rounded-lg ${getSelectClass()}`}
// 							value={selectedOption}
// 							onChange={handleStatusSelect}
// 						>
// 							<option value="">Status</option>
// 							<option value="EM ANDAMENTO">Em Aberto</option>
// 							<option value="PENDENTE">Orçamento</option>
// 							<option value="FECHADO">Finalizado</option>
// 							<option value="CANCELADO">Cancelado</option>
// 						</select>
// 					</div>
// 					<div className="grid grid-cols-12 gap-2">
// 						<div className="col-span-8 grid grid-cols-2 gap-2">
// 							{fields.map((field, index) => (
// 								<div key={index}>
// 									<label className="block text-sm font-bold">
// 										{field.label}
// 									</label>
// 									{field.isTextarea ? (
// 										<textarea
// 											className="w-full p-2 border border-gray-300 rounded-lg max-h-24"
// 											placeholder={field.placeholder}
// 											defaultValue={field.value}
// 										/>
// 									) : field.label === 'Data de abertura' ? (
// 										<input
// 											type="date"
// 											className="w-full p-2 border border-gray-300 rounded-lg max-h-24"
// 											defaultValue={field.value}
// 										/>
// 									) : field.isSelect ? (
// 										<select
// 											className="font-medium px-4 py-2 rounded-lg w-full border border-gray-300"
// 											onChange={field.onChange}
// 											name={field.label}
// 										>
// 											<option
// 												value=""
// 												className="text-gray-400"
// 											>
// 												Escolha um{' '}
// 												{field.label.toLocaleLowerCase()}
// 											</option>
// 											{field.values.map(
// 												(fieldValue, index) => (
// 													<option
// 														value={fieldValue.id}
// 														key={index}
// 													>
// 														{fieldValue.name}
// 													</option>
// 												)
// 											)}
// 										</select>
// 									) : (
// 										<input
// 											className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
// 											value={field.value}
// 											onChange={field.handleChange}
// 										/>
// 									)}
// 								</div>
// 							))}
// 						</div>
// 						<div className="col-span-4 overflow-y-auto border rounded-xl shadow-lg max-h-screen">
// 							<Table
// 								icon={IconProductsBlack}
// 								title={'Adicionar Produtos a Ordem de Serviço'}
// 								columns={column_table_2}
// 								data={data_table_2}
// 								actions={{
// 									showActions: true,
// 									actionButtonText: 'Adicionar Produto',
// 									action: () => {},
// 									deleteAction: () => {},
// 								}}
// 							/>
// 						</div>
// 					</div>
// 					<div className="flex justify-center mt-6">
// 						<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
// 							Criar Ordem de Serviço
// 						</button>
// 					</div>
// 				</div>

// 				{/*
// 				<DetailsTable
// 					fields={fields}
// 					orderId="123"
// 					extraComponent={
// 						<Table
// 							icon={IconProductsBlack}
// 							title="Produtos utilizados na ordem"
// 							columns={column_table_2}
// 							data={data_table_2}
// 							actions={{
// 								showActions: true,
// 								actionButtonText: 'Add Produto',
// 								action: add,
// 								deleteAction: () => {},
// 							}}
// 						/>
// 					}
// 					textButton="Adicionar Ordem"
// 				/> */}
// 			</main>
// 		</div>
// 	);
// };

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useCookies } from 'react-cookie';
import Table from '../../components/table';
import { getUsers } from '../../http/get-users';
import { createOs } from '../../http/create-os';
import { toast } from 'sonner';

interface IUser {
	name: string;
	id: string;
	number: string;
}

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

export const CreateOS: React.FC = () => {
	const today = new Date().toLocaleDateString('pt-BR');
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

	// Função de mudança para todos os inputs
	// const handleChange = (
	// 	e: ChangeEvent<
	// 		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	// 	>
	// ) => {
	// 	let { name, value } = e.target;
	// 	if (name === 'client') {
	// 		const id = value;
	// 		const selectedClient = clients.find((client) => client.id === id);
	// 		setFormValues((prevValues) => ({
	// 			...prevValues,
	// 			['number']: selectedClient!.number,
	// 		}));
	// 		return;
	// 	}
	// 	setFormValues((prevValues) => ({
	// 		...prevValues,
	// 		[name]: value,
	// 	}));
	// };

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
					number: selectedClient.number, // Atualiza o número do cliente automaticamente
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

		const created = await createOs(cookies.jwt, {
			description: formValues.description,
			defect: formValues.defect,
			report: formValues.report,
			extras: formValues.extras,
			status: selectedOption.toUpperCase(),
			//date: formValues.date,
			userId: cookies.id,
			clientId: formValues.client,
			technicianId: formValues.technician,
		});

		if (created) {
			toast.success('Ordem de Serviço criada');
			return;
		}

		toast.error('Erro ao criar Ordem de Serviço');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
				<header className="flex justify-between mb-5">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">
							Ordens - Adicionar
						</h1>
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
											// value={
											// 	formValues[
											// 		field.name as keyof IFormValues
											// 	]
											// }
											value={formValues[
												field.name as keyof IFormValues
											]?.toString()}
											onChange={handleChange}
											className="w-full p-2 border border-gray-300 rounded-lg max-h-24"
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
						<div className="col-span-4 overflow-y-auto border rounded-xl shadow-lg">
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
							Criar Ordem de Serviço
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};
