import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconUserBlack from '../../public/assets/home-page/icons/users/user_icon_b.svg';
import { getUsers } from '../../http/get-users';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { deleteClient } from '../../http/delete-client';
import { toast } from 'sonner';


export const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // Lista completa de usuários
    const [filteredUsers, setFilteredUsers] = useState([]); // Lista filtrada
    const [searchQuery, setSearchQuery] = useState(''); // Termo de pesquisa
    const [cookies] = useCookies();
    const today = new Date().toLocaleDateString('pt-BR');

    const columns = [
        'Id',
        'Email',
        'Nome',
        'CPF/CNPJ',
        'Endereço',
        'Cidade',
        'Bairro',
        'Número',
        'Tipo',
        'Data de registro',
    ];

    const add = () => {
        navigate('/create-user');
    };

    const deleteUserAction = async (id: string) => {
		const result = await deleteClient(cookies.jwt, id);
		if(result.error){
			toast.error(`Erro: ${result.error ? result.error.message || result.error : "Erro desconhecido"}`);
		}else{
			toast.success(`Sucesso: ${result.message}`);
			fetchUsers();
		}
	}

    const fetchUsers = useCallback(async () => {
        const data = await getUsers(cookies.jwt, undefined, 'CLIENT');
        setUsers(data);
        setFilteredUsers(data); // Inicializa a lista filtrada com todos os usuários
    }, [cookies.jwt]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = users.filter((user: any) =>
            user.name?.toLowerCase().includes(lowerCaseQuery) // Filtra apenas pelo nome
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-5 bg-blue-200 space-y-10 h-screen">
                <header className="flex justify-between">
                    <div className="pt-16 md:pt-16 lg:pt-0">
                        <h1 className="text-2xl font-bold">Usuários</h1>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                    <SearchBox
                        onSearch={(query) => setSearchQuery(query)} // Atualiza o termo de pesquisa
                        placeholder="Pesquisar usuário"
                    />
                    <TopNav />
                </header>
                <div className="grid grid-cols-12 max-h-[80%] overflow-y-scroll">
                    <div className="col-span-12">
                        <Table
                            icon={IconUserBlack}
                            title="Usuários"
                            columns={columns}
                            data={filteredUsers} // Passa a lista filtrada
                            actions={{
                                showActions: true,
                                actionButtonText: 'Adicionar Usuário',
                                action: add,
                                deleteAction: deleteUserAction,
                            }}
                            viewPage="/view-user"
                            editPage="/edit-user"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};
