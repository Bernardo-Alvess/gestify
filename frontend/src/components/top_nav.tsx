import CachorroTeste from '../public/assets/home-page/img/cachorro.jpg';
import IconSettings from '../public/assets/home-page/icons/settings_icon.svg';
import IconNotification from '../public/assets/home-page/icons/notification_icon.svg';

const TopNav = () => {
    return (
        <nav>
            <ul className='flex space-x-5'>
                <li>
                    <a href="#settings">
                        <img className='w-7' src={IconSettings} alt="icone configuracoes" />
                    </a>
                </li>
                <li>
                    <a href="#notifications">
                        <img className='w-7' src={IconNotification} alt="icone notificacoes" />
                    </a>
                </li>
                <li>
                    <a href="#profile">
                        <img className='w-7 rounded-full' src={CachorroTeste} alt="foto de perfil" />
                    </a> {/* tirar essa foto de cachorro daqui */}
                </li>
            </ul>
        </nav>
    );
}

export default TopNav