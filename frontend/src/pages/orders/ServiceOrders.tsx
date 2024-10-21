import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconOrdersBlack from '../../public/assets/home-page/icons/orders/orders_icon_b.svg';
import { useCookies } from 'react-cookie';
import { getServiceOrders } from '../../http/get-service-orders';

export const ServiceOrders = () => {
	const [orders, setOrders] = useState([]);
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

	const add = () => {
		alert('ADDDD');
	};

	const fetchServiceOrders = useCallback(async () => {
		const data = await getServiceOrders(cookies.jwt);
		if (data !== orders) setOrders(data);
	}, []);

	useEffect(() => {
		fetchServiceOrders();
	}, [fetchServiceOrders]);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Ordens</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox />
					<TopNav />
				</header>
				<div className="grid grid-cols-12 overflow-y-scroll max-h-[500px] lg:max-h-[550px] xl:max-h-[700px]">
					<div className="col-span-12">
						<Table
							icon={IconOrdersBlack}
							title="Ordens de Serviço"
							columns={columns}
							data={orders}
							actions={{
								showActions: true,
								actionButtonText: 'Adicionar Ordem',
								action: add,
							}}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
