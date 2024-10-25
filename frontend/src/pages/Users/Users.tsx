import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../../components/search-box';
import Sidebar from '../../components/sidebar';
import Table from '../../components/table';
import TopNav from '../../components/top-nav';
import IconProductBlack from '../../public/assets/home-page/icons/products/products_icon_b.svg';
import { getUsers } from '../../http/get-users';
import { useCookies } from 'react-cookie';

export const Users = () => {
	const [users, setUsers] = useState([{}]);
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
		alert('ADDDD');
	};

	const fetchUsers = useCallback(async () => {
		const data = await getUsers(cookies.jwt, undefined, 'CLIENT');
		if (data !== users) {
			setUsers(data);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Dashboard</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<SearchBox></SearchBox>
					<TopNav />
				</header>
				<div className="grid grid-cols-12 max-h-[80%] overflow-y-scroll">
					<div className="col-span-12">
						<Table
							icon={IconProductBlack}
							title="Produtos em estoque"
							columns={columns}
							data={users}
							actions={{
								showActions: true,
								actionButtonText: 'Adicionar Usuário',
								action: add,
							}}
							viewPage='/view-user'
							editPage='/edit-user'
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
