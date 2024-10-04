import SearchBox from '../components/search_box';
import Sidebar from '../components/sidebar';
import Table from '../components/table';
import TopNav from '../components/top_nav';
import IconOrdersBlack from '../public/assets/home-page/icons/orders/orders_icon_b.svg';

export const ServiceOrders = () => {
	const today = new Date().toLocaleDateString('pt-BR');
	const column_table_2 = [
		'Código',
		'Cliente',
		'Responsável',
		'Preço custo',
		'Valor Total',
		'Lucro',
	];

	const data_table_2 = [
		['001', 'Cliente A', 'Técnico A', 'R$ 3.000,00', 'R$ 4.500,00', 'R$ 1.500,00'],
		['002', 'Cliente B', 'Técnico B', 'R$ 150,00', 'R$ 250,00', 'R$ 100,00'],
		['003', 'Cliente C', 'Técnico C', 'R$ 500,00', 'R$ 750,00', 'R$ 250,00'],
		['004', 'Cliente D', 'Técnico D', 'R$ 900,00', 'R$ 1.200,00', 'R$ 300,00'],
		['005', 'Cliente E', 'Técnico E', 'R$ 250,00', 'R$ 350,00', 'R$ 100,00'],
		['006', 'Cliente F', 'Técnico F', 'R$ 400,00', 'R$ 600,00', 'R$ 200,00'],
		['007', 'Cliente G', 'Técnico G', 'R$ 1.200,00', 'R$ 1.500,00', 'R$ 300,00'],
		['008', 'Cliente H', 'Técnico H', 'R$ 400,00', 'R$ 650,00', 'R$ 250,00'],
		['009', 'Cliente I', 'Técnico I', 'R$ 6.000,00', 'R$ 8.000,00', 'R$ 2.000,00'],
		['010', 'Cliente J', 'Técnico J', 'R$ 400,00', 'R$ 550,00', 'R$ 150,00'],
	];

	const add = () => {
		alert('ADDDD');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10 h-screen">
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
							columns={column_table_2}
							data={data_table_2}
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
