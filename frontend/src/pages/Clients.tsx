import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../components/search-box';
import Sidebar from '../components/sidebar';
import Table from '../components/table';
import TopNav from '../components/top-nav';
import IconClientsBlack from '../public/assets/home-page/icons/clients/clients_icon_b.svg';
import { getUsers } from '../http/get-users';
import { useCookies } from 'react-cookie';

export const Clients = () => {
	const [clients, setClients] = useState([{}]);
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');
	const columns = ['Email', 'Nome', 'CPF/CNPJ', 'Número', 'Endereço', 'Tipo'];

	const add = () => {
		alert('ADDDD');
	};

	const fetchClients = useCallback(async () => {
		const data = await getUsers(cookies.jwt, 'CLIENT', undefined);
		if (data != clients) setClients(data);
	}, []);

	useEffect(() => {
		fetchClients();
	}, [fetchClients]);

	console.log(clients);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Clientes</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox />
					<TopNav />
				</header>
				<div className="grid grid-cols-12 overflow-y-scroll max-h-[500px] lg:max-h-[550px] xl:max-h-[700px]">
					<div className="col-span-12">
						<Table
							icon={IconClientsBlack}
							title="Clientes"
							columns={columns}
							data={clients}
							actions={{
								showActions: true,
								actionButtonText: 'Adicionar Cliente',
								action: add,
							}}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
