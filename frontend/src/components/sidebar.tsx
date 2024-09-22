import React from 'react';
import { Link } from 'react-router-dom';
import GestifyLogo from '../public/assets/gestify_texto.svg';
import IconHome from '../public/assets/home-page/icons/home_icon.svg';
import IconServices from '../public/assets/home-page/icons/services_icon.svg';
import IconProducts from '../public/assets/home-page/icons/products_icon.svg';
import IconUsers from '../public/assets/home-page/icons/user_icon.svg';
import IconClients from '../public/assets/home-page/icons/clients_icon.svg';

interface SidebarProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, }) => {
    return (
        <aside className={`fixed inset-0 left-0 z-30 w-52 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 p-10 space-y-10`}>
            {/* logo */}
            <div>
                <Link to="/home/:id">
                    <img className='w-32' src={GestifyLogo} alt="Logo Gestify" />
                </Link>
            </div>

            {/* navegação */}
            <nav>
                <ul className='space-y-5 text-gray-500'>
                    <Link to="/home/:id" className='flex items-center space-x-3 hover:text-blue-500'>
                        <img className='w-6' src={IconHome} alt="Ícone Home" />
                        <span>Home</span>
                    </Link>
                    <Link to="/services" className='flex items-center space-x-3 hover:text-blue-500'>
                        <img className='w-6' src={IconServices} alt="Ícone Serviços" />
                        <span>Serviços</span>
                    </Link>
                    <Link to="/products" className='flex items-center space-x-3 hover:text-blue-500'>
                        <img className='w-6' src={IconProducts} alt="Ícone Produtos" />
                        <span>Produtos</span>
                    </Link>
                    <Link to="/clients" className='flex items-center space-x-3 hover:text-blue-500'>
                        <img className='w-6' src={IconClients} alt="Ícone Clientes" />
                        <span>Clientes</span>
                    </Link>
                    <Link to="/users" className='flex items-center space-x-3 hover:text-blue-500'>
                        <img className='w-6' src={IconUsers} alt="Ícone Usuários" />
                        <span>Usuários</span>
                    </Link>
                </ul>
            </nav>

        </aside>
    );
}

export default Sidebar;