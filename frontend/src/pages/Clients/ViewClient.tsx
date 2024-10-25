import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import OrdersIcon from '../../public/assets/home-page/icons/orders/orders_icon.svg';
import TopNav from '../../components/top-nav';
import { getUserById } from '../../http/get-user-by-id';
import Table from '../../components/table';
import Sidebar from '../../components/sidebar';
import { fetchOrdersForClient } from '../../http/fetch-orders-for-client';
import { BackPageButton } from '../../components/back-page-button';

interface User {
	id: string;
	email: string;
	name: string;
	document: string;
	address?: string | null;
	number?: string | null;
	city?: string | null;
	neighborhood?: string | null;
	date: Date;
	userType: string;
}

const ViewClient = () => {
	const { id } = useParams();
	const [client, setClient] = useState<User | null>(null);
	const [orders, setOrders] = useState([{}]);
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');

	const columns = [
		'Id',
		'Descrição',
		'Defeito',
		'Report',
		'Observações',
		'Data',
		'Status',
		'Técnico',
		'Cliente',
	];

	const fetchClient = useCallback(async () => {
		const data = await getUserById(cookies.jwt, id);
		if (data != client) setClient(data);
	}, [cookies.jwt, id]);

	const getOrders = useCallback(async () => {
		const data = await fetchOrdersForClient(
			cookies.jwt,
			client?.id,
			client?.name,
			'CLIENT'
		);
		if (data != orders) setOrders(data);
	}, [client, cookies.jwt]);

	useEffect(() => {
		fetchClient();
	}, [fetchClient]);

	useEffect(() => {
		if (client) {
			getOrders();
		}
	}, [client, getOrders]);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Cliente</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<BackPageButton route="/clients" />

				<div className="bg-white p-4 rounded-lg shadow-lg w-full">
					<div className="flex justify-between mb-4">
						<h2 className="font-bold text-lg mb-4">
							Cliente: {client?.name}
						</h2>
					</div>

					<div className="grid grid-cols-12 gap-3">
						<div className="col-span-8 grid grid-cols-2 gap-5">
							<div className="flex flex-col gap-1 w-fit">
								<div>
									<label className="block text-sm font-bold">
										{client?.name}
									</label>
									<input
										type={'text'}
										className={`w-full p-2 border border-gray-300 rounded-lg max-h-12`}
										placeholder={'Nome'}
										defaultValue={client?.name}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="document"
								>
									Documento
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="document"
									value={client?.document || 'N/A'}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="phone"
								>
									Telefone
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="phone"
									value={client?.number || 'N/A'}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="city"
								>
									Cidade
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="city"
									value={client?.city || 'N/A'}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="neighborhood"
								>
									Bairro
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="neighborhood"
									value={client?.neighborhood || 'N/A'}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="email"
								>
									Email
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="email"
									value={client?.email || 'N/A'}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="date"
								>
									Data do cadastro
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="date"
									value={
										client?.date
											? new Date(
													client.date
											  ).toLocaleDateString('pt-BR')
											: 'N/A'
									}
								/>
							</div>
							<div className="flex flex-col gap-1 w-fit">
								<label
									className="font-bold text-md"
									htmlFor="address"
								>
									Endereço
								</label>
								<input
									readOnly
									className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
									type="text"
									name="address"
									value={client?.address || 'N/A'}
								/>
							</div>
						</div>

						<div className="col-span-4 overflow-y-auto border rounded-xl shadow-lg h-fit">
							<Table
								icon={OrdersIcon}
								title="Ordens associadas ao cliente"
								columns={columns}
								data={orders}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export { ViewClient };
