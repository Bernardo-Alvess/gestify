import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconServices from '../public/assets/home-page/icons/services_icon.svg';
import IconProducts from '../public/assets/home-page/icons/products_icon.svg';
import IconUsers from '../public/assets/home-page/icons/user_icon.svg';
import IconClients from '../public/assets/home-page/icons/clients_icon.svg';
import IconMenu from '../public/assets/home-page/icons/menu_icon.svg';
import InfoCard from '../components/infocard'; 
import Sidebar from '../components/sidebar';
import TopNav from '../components/top_nav';

export const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [statistics, setStatistics] = useState({
        openOrders: 0,
        clients: 0,
        products: 0,
        users: 0,
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        // Carregar dados da API
        const fetchData = async () => {
            const response = await fetch('/api/statistics');
            const data = await response.json();
            setStatistics(data);
        };

        fetchData();
    }, []);

    return (
        <div className='flex h-screen'>
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            {!sidebarOpen && (
                <button className='lg:hidden fixed top-10 left-5 z-40 p-2 bg-white rounded-full' onClick={toggleSidebar}>
                    <img className='w-6' src={IconMenu} alt="icone do menu" />
                </button>
            )}
            {sidebarOpen && <div className='fixed inset-0 bg-black opacity-50 lg:hidden' onClick={toggleSidebar}></div>}
            <main className='flex-1 p-10 bg-blue-200 space-y-10'>
                <header className='flex justify-between'>
                    <div className='pt-16 md:pt-16 lg:pt-0'>
                        <h1 className='text-2xl font-bold'>Dashboard</h1>
                        <p className='text-sm text-gray-500'>23/09/2024</p>
                    </div>
                    <TopNav />
                </header>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <Link to="/services">
                        <InfoCard icon={IconServices} title="Ordens de Serviço" value={statistics.openOrders} />
                    </Link>
                    <Link to="/clients">
                        <InfoCard icon={IconClients} title="Clientes" value={statistics.clients} />
                    </Link>
                    <Link to="/products">
                        <InfoCard icon={IconProducts} title="Produtos" value={statistics.products} />
                    </Link>
                    <Link to="/users">
                        <InfoCard icon={IconUsers} title="Usuários" value={statistics.users} />
                    </Link>
                </div>
            </main>
        </div>
    );
};
