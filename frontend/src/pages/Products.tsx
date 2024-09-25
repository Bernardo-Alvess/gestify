import Sidebar from '../components/sidebar';
import Table from '../components/table';
import TopNav from '../components/top_nav';
import IconProductBlack from '../public/assets/home-page/icons/products/products_icon_b.svg';

import { Pagination } from '@mui/material';

export const Products = () => {
	const today = new Date().toLocaleDateString('pt-BR');
	const column_table_2 = [
		'Código',
		'Nome',
		'Quantidade',
		'Marca',
		'Preço venda',
	];

	const data_table_2 = [
		['001', 'Notebook Dell Inspiron', 15, 'Dell', 'R$ 4.500,00'],
		['002', 'Mouse Gamer Logitech', 50, 'Logitech', 'R$ 250,00'],
		['003', 'Teclado Mecânico Razer', 30, 'Razer', 'R$ 750,00'],
		['004', 'Monitor LG UltraWide', 20, 'LG', 'R$ 1.200,00'],
		['005', 'SSD Kingston 480GB', 100, 'Kingston', 'R$ 350,00'],
		['006', 'Memória RAM Corsair 16GB', 40, 'Corsair', 'R$ 600,00'],
		['007', 'Cadeira Gamer DXRacer', 10, 'DXRacer', 'R$ 1.500,00'],
		['008', 'Headset HyperX Cloud II', 25, 'HyperX', 'R$ 650,00'],
		['009', 'Placa de Vídeo Nvidia RTX 3080', 5, 'Nvidia', 'R$ 8.000,00'],
		['010', 'Fonte Corsair 750W', 35, 'Corsair', 'R$ 550,00'],
		['006', 'Memória RAM Corsair 16GB', 40, 'Corsair', 'R$ 600,00'],
		['007', 'Cadeira Gamer DXRacer', 10, 'DXRacer', 'R$ 1.500,00'],
		['008', 'Headset HyperX Cloud II', 25, 'HyperX', 'R$ 650,00'],
		['009', 'Placa de Vídeo Nvidia RTX 3080', 5, 'Nvidia', 'R$ 8.000,00'],
	];

	const add = () => {
		alert('ADDDD');
	};

	return (
		<div className="flex h-full">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Dashboard</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
				<div className="grid grid-cols-12">
					<div className="col-span-12">
						<Table
							icon={IconProductBlack}
							title="Produtos em estoque"
							columns={column_table_2}
							data={data_table_2}
							actions={{
								showActions: true,
								actionButtonText: 'Adicionar Produto',
								action: add,
							}}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
