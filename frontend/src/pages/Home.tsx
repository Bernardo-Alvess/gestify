import { useState } from 'react';
import IconServices from '../public/assets/home-page/icons/services_icon.svg';
import IconProducts from '../public/assets/home-page/icons/products_icon.svg';
import IconUsers from '../public/assets/home-page/icons/user_icon.svg';
import IconClients from '../public/assets/home-page/icons/clients_icon.svg';
import IconMenu from '../public/assets/home-page/icons/menu_icon.svg';
import InfoCard from '../components/infocard'; 
import Sidebar from '../components/sidebar';
import TopNav from '../components/top_nav';// tirar foto do cachorro depois

export const Home = () => {

	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className='flex h-screen'>

			{/* sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

			{/* botao pra abrir e fechar o menu, apenas visivel em tela pequena */}
			{!sidebarOpen && (
				<button className='lg:hidden fixed top-10 left-5 z-40 p-2 bg-white rounded-full' onClick={toggleSidebar}>
					<img className='w-6' src={IconMenu} alt="icone do menu" />
				</button>
			)}

			{/* seta o fundo se o menu tiver aberto */}
			{sidebarOpen && <div className='fixed inset-0 bg-black opacity-50 lg:hidden' onClick={toggleSidebar}></div>}

			{/* conteudo principal */}
			<main className='flex-1 p-10 bg-blue-200 space-y-10'>
				<header className='flex justify-between'>
					<div className='pt-16 md:pt-16 lg:pt-0'>
						<h1 className='text-2xl font-bold'>Dashboard</h1>
						<p className='text-sm text-gray-500'>23/09/2024</p>
					</div>
					
					{/* navegacao */}
					<TopNav />
				</header>

				{/* cards */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<InfoCard icon={IconServices} title="Ordens de Serviço" value={"777"} />
					<InfoCard icon={IconClients} title="Clientes" value={"183"} />
					<InfoCard icon={IconProducts} title="Produtos" value={"27"} />
					<InfoCard icon={IconUsers} title="Usuários" value={"9"} />
				</div>
			</main>
		</div>
	);
};
