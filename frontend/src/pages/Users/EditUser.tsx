import { useCookies } from 'react-cookie';

import UserBlue from '../../public/assets/view-user-page/user-blue.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../../http/get-user-by-id';
import { updateUser } from '../../http/update-user';
import { BackPageButton } from '../../components/back-page-button';

export interface IUpdateUser {
	name?: string | null | undefined;
	email?: string | null;
	document?: string | null;
	address?: string | null;
	neighborhood?: string | null;
	city?: string | null;
	number?: string | null;
}

const EditUser = () => {
	const { id } = useParams();
	const [user, setUser] = useState<IUpdateUser | null>(null);
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');

	const fetchUser = useCallback(async () => {
		const data = await getUserById(cookies.jwt, id);
		if (data != user) setUser(data);
	}, [cookies.jwt, id]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prevuser) =>
			prevuser ? { ...prevuser, [name]: value } : null
		);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const user: IUpdateUser = {
			name: formData.get('name')!.toString(),
			email: formData.get('email')?.toString(),
			document: formData.get('document')?.toString(),
			address:
				formData.get('address')?.toString() != ''
					? formData.get('address')?.toString()
					: null,
			neighborhood:
				formData.get('neighborhood')?.toString() != ''
					? formData.get('neighborhood')?.toString()
					: null,
			city:
				formData.get('city')?.toString() != ''
					? formData.get('city')?.toString()
					: null,
			number:
				formData.get('number')?.toString() != ''
					? formData.get('number')?.toString()
					: null,
		};

		if (user?.name!.length < 2) {
			toast.error('Nome menor que 2 caracteres');
		}

		if (user?.document!.length < 11) {
			toast.error('CPF no tamanho errado');
		}

		updateUser(cookies.jwt, id, user);
		toast.success('Usuário atualizado');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex flex-col flex-1 p-10 bg-blue-200 space-y-10 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Usuários</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
				<BackPageButton route={'/users'} />
				<div className="flex flex-col gap-10 self-center h-5/6 w-fit bg-white overflow-y-auto rounded-lg shadow-xl p-2 overflow-x-hidden">
					<div className="flex p-2 w-full h-16 items-center gap-2 border-b border-black border-opacity-10 ">
						<img src={UserBlue} alt="" />
						<p className="text-bold text-xl">
							Alterar Usuário: {user?.name ? user.name : 'N/A'}
						</p>
					</div>
					<div className="flex flex-col gap-10">
						<form
							id="edit-user-form"
							className="col-span-4 flex"
							onSubmit={handleSubmit}
						>
							<div className="p-3 flex flex-col gap-12">
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="name"
									>
										Nome
									</label>
									<input
										required
										className="p-1 border rounded-lg"
										type="text"
										name="name"
										onChange={handleInputChange}
										value={user?.name ? user.name : ''}
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="document"
									>
										Documento
									</label>
									<input
										required
										inputMode="numeric"
										className="p-1 border rounded-lg"
										type="text"
										name="document"
										onChange={handleInputChange}
										value={
											user?.document ? user.document : ''
										}
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="number"
									>
										Telefone
									</label>
									<input
										inputMode="numeric"
										className="p-1 border rounded-lg"
										type="text"
										name="number"
										onChange={handleInputChange}
										value={user?.number ? user.number : ''}
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="city"
									>
										Cidade
									</label>
									<input
										className="p-1 border rounded-lg"
										type="text"
										name="city"
										onChange={handleInputChange}
										value={user?.city ? user.city : ''}
									/>
								</div>
							</div>
							<div className="p-3 flex flex-col gap-12">
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="email"
									>
										Email
									</label>
									<input
										required
										className="p-1 border rounded-lg"
										type="email"
										name="email"
										onChange={handleInputChange}
										value={user?.email ? user.email : ''}
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="address"
									>
										Endereço
									</label>
									<input
										className="p-1 border rounded-lg"
										type="text"
										name="address"
										onChange={handleInputChange}
										value={
											user?.address ? user.address : ''
										}
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="neighborhood"
									>
										Bairro
									</label>
									<input
										className="p-1 border rounded-lg"
										type="text"
										name="neighborhood"
										onChange={handleInputChange}
										value={
											user?.neighborhood
												? user.neighborhood
												: ''
										}
									/>
								</div>
							</div>
						</form>
						<button
							form="edit-user-form"
							className="self-center bg-primary p-2 w-60 h-11 rounded-lg text-white font-bold"
							type="submit"
						>
							Enviar
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export { EditUser };
