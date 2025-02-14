import { useCookies } from 'react-cookie';
import IconClients from '../../public/assets/home-page/icons/clients/clients_icon.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../../http/get-user-by-id';
import { updateUser } from '../../http/update-user';
import { BackPageButton } from '../../components/back-page-button';
import ReactInputMask from 'react-input-mask';

export interface IUpdateClient {
	name?: string | null | undefined;
	email?: string | null;
	document?: string | null;
	address?: string | null;
	neighborhood?: string | null;
	city?: string | null;
	number?: string | null;
}

const EditClient = () => {
	const { id } = useParams();
	const [client, setClient] = useState<IUpdateClient | null>(null);
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');

	const fetchClient = useCallback(async () => {
		const data = await getUserById(cookies.jwt, id);
		if (data != client) setClient(data);
	}, [cookies.jwt, id]);

	useEffect(() => {
		fetchClient();
	}, [fetchClient]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setClient((prevClient) =>
			prevClient ? { ...prevClient, [name]: value } : null
		);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const client: IUpdateClient = {
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

		if (client?.name!.length < 2) {
			toast.error('Nome menor que 2 caracteres');
		}

		if (client?.document!.length < 11) {
			toast.error('CPF no tamanho errado');
		}

		updateUser(cookies.jwt, id, client);

		toast.success('Cliente atualizado');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-6 bg-blue-200 space-y-6 h-screen">
				<header className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold">Clientes - Editar</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<BackPageButton route="/clients" />

				<div className="bg-white p-6 rounded-lg shadow-md space-y-4">
					<div className="flex gap-2 border-b pb-3 border-gray-300">
						<img src={IconClients} className="w-6" alt="" />
						<h2 className="font-semibold text-lg">
							{client?.name ? client.name : 'N/A'}
						</h2>
					</div>

					<div className="gap-4 py-14 px-32">
						<form
							id="create-client-form"
							className="grid grid-cols-2 gap-4"
							onSubmit={handleSubmit}
						>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold text-black"
									htmlFor="name"
								>
									Nome
								</label>
								<input
									required
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="name"
									onChange={handleInputChange}
									value={client?.name || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold text-black"
									htmlFor="email"
								>
									Email
								</label>
								<input
									required
									className="p-2 border border-gray-300 rounded-lg"
									type="email"
									name="email"
									onChange={handleInputChange}
									value={client?.email || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold"
									htmlFor="document"
								>
									Documento
								</label>
								<ReactInputMask
									mask={'999.999.999-99'}
									required
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="document"
									onChange={handleInputChange}
									value={client?.document || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold"
									htmlFor="address"
								>
									Endereço
								</label>
								<input
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="address"
									onChange={handleInputChange}
									value={client?.address || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold"
									htmlFor="neighborhood"
								>
									Bairro
								</label>
								<input
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="neighborhood"
									onChange={handleInputChange}
									value={client?.neighborhood || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="font-semibold" htmlFor="city">
									Cidade
								</label>
								<input
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="city"
									onChange={handleInputChange}
									value={client?.city || ''}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									className="font-semibold"
									htmlFor="number"
								>
									Telefone
								</label>
								<ReactInputMask
									mask={'(99) 9 9999-9999'}
									className="p-2 border border-gray-300 rounded-lg"
									type="text"
									name="number"
									onChange={handleInputChange}
									value={client?.number || ''}
								/>
							</div>
						</form>
					</div>

					<div className="flex justify-center mt-6">
						<button
							form="create-client-form"
							className="w-full max-w-sm bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
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

export { EditClient };
