import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconOrders from '../public/assets/home-page/icons/orders/orders_icon.svg';
import IconOrdersBlack from '../public/assets/home-page/icons/orders/orders_icon_b.svg';
import IconProductsBlack from '../public/assets/home-page/icons/products/products_icon_b.svg';
import IconProducts from '../public/assets/home-page/icons/products/products_icon.svg';
import IconUsers from '../public/assets/home-page/icons/users/user_icon.svg';
import IconClients from '../public/assets/home-page/icons/clients/clients_icon.svg';
import InfoCard from '../components/infocard';
import Sidebar from '../components/sidebar';
import TopNav from '../components/top_nav';
import Table from '../components/table';
import Reminder from '../components/reminder';
import SearchBox from '../components/search_box';

export const Home = () => {
	// dados que vão sair
	const [statistics, setStatistics] = useState({
		openOrders: 0,
		clients: 0,
		products: 0,
		users: 0,
	});

	const column_table_1 = ['Código', 'Nome', 'Quantidade', 'Marca'];

	const column_table_2 = ['Código', 'Data de entrega', 'Cliente', 'Produto'];

	const data_table_1 = [
		['123', 'Placa Mãe', '2', 'Asus'],
		['123', 'Placa Mãe', '2', 'Asus'],
		['123', 'Placa Mãe', '2', 'Asus'],
		['123', 'Placa Mãe', '2', 'Asus'],
	];
	const data_table_2 = [
		['123', '23/09/2024', 'Lorenzo Cardoso', 'SSD'],
		['123', '23/09/2024', 'Lorenzo Cardoso', 'SSD'],
		['123', '23/09/2024', 'Lorenzo Cardoso', 'SSD'],
	];

	const [reminders, setReminders] = useState<Reminder[]>(() => {
		const savedReminders = localStorage.getItem('reminders');
		return savedReminders ? JSON.parse(savedReminders) : [];
	});

	const today = new Date().toLocaleDateString('pt-BR');

	const addReminder = (reminder: Reminder) => {
		setReminders((prev) => {
			const updatedReminders = [...prev, reminder];
			localStorage.setItem('reminders', JSON.stringify(updatedReminders)); // Salva no localStorage
			return updatedReminders;
		});
	};

	const removeReminder = (index: number) => {
		setReminders((prev) => {
			const updatedReminders = prev.filter((_, i) => i !== index);
			localStorage.setItem('reminders', JSON.stringify(updatedReminders));
			return updatedReminders;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('');
			const data = await response.json();
			setStatistics(data);
		};

		fetchData();
	}, []);

	return (
		<div className="flex min-h-screen">
			<Sidebar />

			<main className="flex-1 p-5 bg-blue-200 space-y-10">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Dashboard</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox />
					<TopNav />
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Link to="/orders">
						<InfoCard
							icon={IconOrders}
							title="Ordens de Serviço"
							value={statistics.openOrders}
						/>
					</Link>
					<Link to="/clients">
						<InfoCard
							icon={IconClients}
							title="Clientes"
							value={statistics.clients}
						/>
					</Link>
					<Link to="/products">
						<InfoCard
							icon={IconProducts}
							title="Produtos"
							value={statistics.products}
						/>
					</Link>
					<Link to="/users">
						<InfoCard
							icon={IconUsers}
							title="Usuários"
							value={statistics.users}
						/>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
					<div className="col-span-5">
						<Table
							icon={IconProductsBlack}
							title="Produtos acabando no estoque"
							columns={column_table_1}
							data={data_table_1}
						/>
					</div>
					<div className="col-span-5">
						<Table
							icon={IconOrdersBlack}
							title="Ordens para entrega"
							columns={column_table_2}
							data={data_table_2}
						/>
					</div>
					<div className="col-span-2">
						<Reminder
							reminders={reminders}
							addReminder={addReminder}
							removeReminder={removeReminder}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
