import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import IconClients from '../../public/assets/home-page/icons/clients/clients_icon.svg';
import TopNav from '../../components/top-nav';
import { getUserById } from '../../http/get-user-by-id';
import Sidebar from '../../components/sidebar';
import { fetchOrdersForClient } from '../../http/fetch-orders-for-client';
import { BackPageButton } from '../../components/back-page-button';
import ReactInputMask from 'react-input-mask';

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
			<main className="flex-1 p-6 bg-blue-200 space-y-6 h-screen">
				<header className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold">
							Cliente - Visualizar
						</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<BackPageButton route="/clients" />

				<div className="bg-white p-6 rounded-lg shadow-md space-y-4">
					<div className="flex gap-2 border-b pb-3 border-gray-300">
						<img src={IconClients} className="w-6" alt="" />
						<h2 className="font-semibold text-lg">
							{client?.name}
						</h2>
					</div>

					<div className="gap-4 py-14 px-32">
						<div className="col-span-1 grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-black">
									Cliente
								</label>
								<input
									type="text"
									readOnly
									value={client?.name || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-black">
									Email
								</label>
								<input
									type="text"
									readOnly
									value={client?.email || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-gray-700">
									Documento
								</label>
								<ReactInputMask
									mask={'999.999.999-99'}
									type="text"
									readOnly
									value={client?.document || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-gray-700">
									Data de Cadastro
								</label>
								<input
									type="text"
									readOnly
									value={
										client?.date
											? new Date(
													client.date
											  ).toLocaleDateString('pt-BR')
											: 'N/A'
									}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-gray-700">
									Telefone
								</label>
								<ReactInputMask
									mask={'(99) 9 9999-9999'}
									type="text"
									readOnly
									value={client?.number || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>

							<div className="flex flex-col gap-1">
								<label className="font-semibold text-gray-700">
									Cidade
								</label>
								<input
									type="text"
									readOnly
									value={client?.city || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold text-gray-700">
									Endereço
								</label>
								<input
									type="text"
									readOnly
									value={client?.address || 'N/A'}
									className="w-full p-2 border border-gray-300 rounded-lg"
								/>
							</div>
						</div>
					</div>

					{/* <div className="flex justify-center mt-6">
						<button className="w-full max-w-sm bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
							Visualizar cliente
						</button>
					</div> */}
				</div>
			</main>
		</div>
	);
};

export { ViewClient };
