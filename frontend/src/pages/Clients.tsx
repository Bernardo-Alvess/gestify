import SearchBox from '../components/search-box';
import Sidebar from '../components/sidebar';
import Table from '../components/table';
import TopNav from '../components/top-nav';
import IconClientsBlack from '../public/assets/home-page/icons/clients/clients_icon_b.svg';

export const Clients = () => {
	const today = new Date().toLocaleDateString('pt-BR');
	const column_table_2 = [
		'Código',
		'Nome',
		'Email',
		'Telefone',
		'Endereço',
	];

	const data_table_2 = [
		['001', 'Cliente A', 'tecnicoa@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['002', 'Cliente B', 'tecnicob@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['003', 'Cliente C', 'tecnicoc@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['004', 'Cliente D', 'tecnicod@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['005', 'Cliente E', 'tecnicoe@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['006', 'Cliente F', 'tecnicof@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['007', 'Cliente G', 'tecnicog@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['008', 'Cliente H', 'tecnicoh@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['009', 'Cliente I', 'tecnicoi@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
		['010', 'Cliente J', 'tecnicoj@gmail.com', '(51)99999-9999', 'Av. Paulista, 123'],
	];

	const add = () => {
		alert('ADDDD');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-5 bg-blue-200 space-y-10 h-screen">
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
							columns={column_table_2}
							data={data_table_2}
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
