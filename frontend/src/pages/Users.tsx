import { useCallback, useEffect, useState } from 'react';
import SearchBox from '../components/search_box';
import Sidebar from '../components/sidebar';
import Table from '../components/table';
import TopNav from '../components/top_nav';
import IconProductBlack from '../public/assets/home-page/icons/products/products_icon_b.svg';
import { getUsers } from '../http/get-users';

export const Users = () => {
	const [users, setUsers] = useState([{}]);
	const today = new Date().toLocaleDateString('pt-BR');
	const columns = ['Email', 'Nome', 'CPF/CNPJ', 'Número', 'Endereço', 'Tipo'];

	const add = () => {
		alert('ADDDD');
	};

	const fetchUsers = useCallback(async () => {
		const data = await getUsers(undefined, 'CLIENT');
		if (data !== users) {
			setUsers(data);
		}

		//		setUsers(arr);
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	console.log(Object.keys(users[0]));

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