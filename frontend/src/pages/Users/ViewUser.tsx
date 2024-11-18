import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import OrdersIcon from '../../public/assets/home-page/icons/orders/orders_icon_b.svg';
import TopNav from '../../components/top-nav';
import { getUserById } from '../../http/get-user-by-id';
import Table from '../../components/table';
import Sidebar from '../../components/sidebar';
import { fetchOrdersForTechnician } from '../../http/fetch-orders-for-technician';
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

const ViewUser = () => {
	const { id } = useParams();
	const [user, setUser] = useState<User | null>(null);
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
		'Usuário',
		'Cliente',
	];

	const fetchUser = useCallback(async () => {
		const data = await getUserById(cookies.jwt, id);
		if (data != user) setUser(data);
	}, [cookies.jwt, id]);

	const getOrders = useCallback(async () => {
		const data = await fetchOrdersForTechnician(
			cookies.jwt,
			user?.id,
			user?.name,
			'TECHNICIAN'
		);
		if (data != orders) setOrders(data);
	}, [user, cookies.jwt]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	useEffect(() => {
		if (user?.id) {
			getOrders();
		}
	}, [user, getOrders]);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-3 h-screen overflow-y-auto">
				<header className="flex justify-between mb-5">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Usuário</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<BackPageButton route="/users" />

				<div className="bg-white p-4 rounded-lg shadow-lg w-full">
					<div className="flex justify-between mb-4">
						<h2 className="font-bold text-lg mb-4">
							Usuário: {user?.name}
						</h2>
					</div>

					<div className="grid grid-cols-12 gap-2">
						<div className="col-span-8 grid grid-cols-2 gap-2">
							{[
								{
									label: 'Nome',
									name: 'name',
									value: user?.name
								},
								{
									label: 'Documento',
									name: 'document',
									value: user?.document || 'N/A'
								},
								{
									label: 'Telefone',
									name: 'number',
									value: user?.number || 'N/A'
								},
								{
									label: 'Cidade',
									name: 'city',
									value: user?.city || 'N/A'
								},
								{
									label: 'Bairro',
									name: 'neighborhood',
									value: user?.neighborhood || 'N/A'
								},
								{
									label: 'Email',
									name: 'email',
									value: user?.email || 'N/A'
								},
								{
									label: 'Data do Cadastro',
									name: 'date',
									value: user?.date ? new Date(user.date).toLocaleDateString('pt-BR') : 'N/A'
								},
								{
									label: 'Endereço',
									name: 'address',
									value: user?.address || 'N/A'
								},
							].map((field, index) => (
								<div key={index}>
									<label className="block text-sm font-bold">{field.label}</label>
									<input
										readOnly
										className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
										type="text"
										value={field.value}
									/>
								</div>
							))}
						</div>

						<div className="col-span-4 border rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
							<Table
								icon={OrdersIcon}
								title="Ordens associadas ao usuário"
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

export { ViewUser };
