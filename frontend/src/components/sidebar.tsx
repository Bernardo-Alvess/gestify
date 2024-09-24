import { useState } from 'react';
import { Link } from 'react-router-dom';
import GestifyLogo from '../public/assets/gestify_texto.svg';
import IconHome from '../public/assets/home-page/icons/home_icon.svg';
import IconServices from '../public/assets/home-page/icons/services_icon.svg';
import IconProducts from '../public/assets/home-page/icons/products_icon.svg';
import IconUsers from '../public/assets/home-page/icons/user_icon.svg';
import IconClients from '../public/assets/home-page/icons/clients_icon.svg';
import IconMenu from '../public/assets/home-page/icons/menu_icon.svg';
import { useCookies } from 'react-cookie';

const Sidebar = () => {
	const [cookies] = useCookies(['id']);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			{!sidebarOpen && (
				<button
					className="lg:hidden fixed top-10 left-5 z-40 p-2 bg-white rounded-full"
					onClick={toggleSidebar}
				>
					<img className="w-6" src={IconMenu} alt="icone do menu" />
				</button>
			)}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 lg:hidden"
					onClick={toggleSidebar}
				></div>
			)}
			<aside
				className={`fixed inset-0 left-0 z-30 w-52 bg-white transform ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 p-10 space-y-10`}
			>
				{/* logo */}
				<div>
					<Link to={`/home/${cookies.id}`}>
						<img
							className="w-32"
							src={GestifyLogo}
							alt="Logo Gestify"
						/>
					</Link>
				</div>

				{/* navegação */}
				<nav>
					<ul className="space-y-5 text-gray-500">
						<Link
							to={`/home/${cookies.id}`}
							className="flex items-center space-x-3 hover:text-blue-500"
						>
							<img
								className="w-6"
								src={IconHome}
								alt="Ícone Home"
							/>
							<span>Home</span>
						</Link>
						<Link
							to="/services"
							className="flex items-center space-x-3 hover:text-blue-500"
						>
							<img
								className="w-6"
								src={IconServices}
								alt="Ícone Serviços"
							/>
							<span>Serviços</span>
						</Link>
						<Link
							to="/products"
							className="flex items-center space-x-3 hover:text-blue-500"
						>
							<img
								className="w-6"
								src={IconProducts}
								alt="Ícone Produtos"
							/>
							<span>Produtos</span>
						</Link>
						<Link
							to="/clients"
							className="flex items-center space-x-3 hover:text-blue-500"
						>
							<img
								className="w-6"
								src={IconClients}
								alt="Ícone Clientes"
							/>
							<span>Clientes</span>
						</Link>
						<Link
							to="/users"
							className="flex items-center space-x-3 hover:text-blue-500"
						>
							<img
								className="w-6"
								src={IconUsers}
								alt="Ícone Usuários"
							/>
							<span>Usuários</span>
						</Link>
					</ul>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
