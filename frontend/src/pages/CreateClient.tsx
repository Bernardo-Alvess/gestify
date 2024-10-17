import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import UserBlue from '../public/assets/view-user-page/user-blue.svg';
import OrdersIcon from '../public/assets/home-page/icons/orders/orders_icon.svg';
import TopNav from '../components/top-nav';
import { getUserById } from '../http/get-user-by-id';
import Table from '../components/table';
import Sidebar from '../components/sidebar';
import { fetchOrdersForClient } from '../http/fetch-orders-for-client';

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

const CreateClient = () => {
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
			client?.name
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

	console.log(client);
	console.log(orders);
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Clientes</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
				<div className="flex flex-col h-5/6 w-full bg-white overflow-y-auto rounded-lg shadow-xl p-2 overflow-x-hidden">
					<div className="flex p-2 w-full h-16 items-center gap-2 border-b border-black border-opacity-10">
						<img src={UserBlue} alt="" />
						<p className="text-bold text-xl">
							Adicionar novo cliente ao sistema
						</p>
					</div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(125px,1fr))] overflow-y-scroll max-h-[500px] lg:max-h-[550px] xl:max-h-[700px]">
						<div className="col-span-4 flex">
							<div className="p-3 flex flex-col gap-12">
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="client"
									>
										Cliente
									</label>
									<input
										required
										className="p-1 border rounded-lg"
										type="text"
										name="client"
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="document"
									>
										Documento
									</label>
									<input
										required
										className="p-1 border rounded-lg"
										type="text"
										name="document"
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
										className="p-1 border rounded-lg"
										type="text"
										name="phone"
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
										className="p-1 border rounded-lg"
										type="text"
										name="city"
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
										className="p-1 border rounded-lg"
										type="text"
										name="neighborhood"
									/>
								</div>
							</div>
							<div className="p-3 flex flex-col gap-12">
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="email"
									>
										Email
									</label>
									<input
										required
										className="p-1 border rounded-lg"
										type="text"
										name="email"
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
										className="p-1 border rounded-lg"
										type="text"
										name="address"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export { CreateClient };
