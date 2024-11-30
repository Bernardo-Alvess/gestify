import { useCookies } from 'react-cookie';

import UserBlue from '../../public/assets/view-user-page/user-blue.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { createClient, ICreateClient } from '../../http/create-client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { BackPageButton } from '../../components/back-page-button';
import InputMask from 'react-input-mask';

const CreateClient = () => {
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const client: ICreateClient = {
			name: formData.get('name')?.toString(),
			email: formData.get('email')?.toString(),
			document: formData.get('document')?.toString(),
			address: formData.get('address')?.toString(),
			neighborhood: formData.get('neighborhood')?.toString(),
			city: formData.get('city')?.toString(),
			number: formData.get('number')?.toString(),
		};

		const { id } = await createClient(cookies.jwt, client);

		if (!id) {
			toast.error('Erro ao criar cliente');
			return;
		}
		navigate('/clients');
		toast.success('Cliente adicionado');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex flex-col flex-1 p-10 bg-blue-200 space-y-6 h-screen">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Clientes</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
				<BackPageButton route={'/clients'} />
				<div className="flex flex-col gap-10 self-center h-5/6 w-fit bg-white overflow-y-auto rounded-lg shadow-xl p-2 overflow-x-hidden">
					<div className="flex p-2 w-full h-16 items-center gap-2 border-b border-black border-opacity-10 ">
						<img src={UserBlue} alt="" />
						<p className="text-bold text-xl">
							Adicionar novo cliente ao sistema
						</p>
					</div>
					<div className="flex flex-col gap-10">
						<form
							id="create-client-form"
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
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="document"
									>
										Documento
									</label>
									<InputMask
										mask={'999.999.999-99'}
										required
										className="p-1 border rounded-lg"
										type="text"
										name="document"
									/>
								</div>
								<div className="flex flex-col gap-1 w-fit">
									<label
										className="font-bold text-md"
										htmlFor="number"
									>
										Telefone
									</label>
									<InputMask
										mask={'(99) 9 9999-9999'}
										className="p-1 border rounded-lg"
										type="text"
										name="number"
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
										type="text"
										name="email"
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
									/>
								</div>
							</div>
						</form>
						<button
							form="create-client-form"
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

export { CreateClient };
