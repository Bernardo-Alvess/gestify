import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import { getServiceOrders } from '../../http/get-service-orders';
import IconOrdersBlack from '../../public/assets/home-page/icons/orders/orders_icon_b.svg';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteSo } from '../../http/delete-so';

export const ServiceOrders = () => {
	const [orders, setOrders] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();
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
		'Telefone do Cliente',
	];

	const add = () => {
		navigate('/createos');
	};

	const fetchServiceOrders = useCallback(async () => {
		const data = await getServiceOrders(cookies.jwt);
		setOrders(data);
		setFilteredOrders(data);
	}, [cookies.jwt]);

	useEffect(() => {
		const lowerCaseQuery = searchQuery.toLowerCase();
		const filtered = orders.filter((order: any) => {
			const technician = order.technicianId || "";
			const client = order.clientId || "";
			return (
				technician.toLowerCase().includes(lowerCaseQuery) ||
				client.toLowerCase().includes(lowerCaseQuery)
			);
		});
		setFilteredOrders(filtered);
	}, [searchQuery, orders]);

	useEffect(() => {
		fetchServiceOrders();
	}, [fetchServiceOrders]);

	const deleteOsAction = async(id: string) => {
		const result = await deleteSo(cookies.jwt, id);
		if(result.error){
			toast.error(`Erro: ${result.error ? result.error.message || result.error : "Erro desconhecido"}`);
		}else{
			toast.success(`Sucesso: ${result.message}`);
			fetchServiceOrders();
		}
	}
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Ordens</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox
						onSearch={(query) => setSearchQuery(query)}
						placeholder="Pesquisar por técnico ou cliente"
					/>
					<TopNav />
				</header>
				<div className="grid grid-cols-12 overflow-y-scroll max-h-[500px] lg:max-h-[550px] xl:max-h-[700px]">
					<div className="col-span-12">
						<Table
							icon={IconOrdersBlack}
							title="Ordens de Serviço"
							columns={columns}
							data={filteredOrders}
							actions={{
								showActions: true,
								actionButtonText: 'Adicionar Ordem',
								action: add,
								deleteAction: deleteOsAction,
							}}
							viewPage="/viewos"
							editPage="/editos"
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
