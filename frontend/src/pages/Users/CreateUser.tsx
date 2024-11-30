import { useCookies } from 'react-cookie';

import UserBlue from '../../public/assets/view-user-page/user-blue.svg';
import TopNav from '../../components/top-nav';
import Sidebar from '../../components/sidebar';
import { toast } from 'sonner';
import { ICreateUser, createUser } from '../../http/create-user';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
	const [cookies] = useCookies();
	const today = new Date().toLocaleDateString('pt-BR');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const client: ICreateUser = {
			name: formData.get('name')?.toString(),
			email: formData.get('email')?.toString(),
			document: formData.get('document')?.toString(),
			address: formData.get('address')?.toString(),
			neighborhood: formData.get('neighborhood')?.toString(),
			city: formData.get('city')?.toString(),
			number: formData.get('number')?.toString(),
			userType: formData.get('userType')?.toString(),
			password: formData.get('password')?.toString(),
		};

		const { id } = await createUser(cookies.jwt, client);

		if (!id) {
			toast.error('Erro ao criar usuário');
			return;
		}

		navigate('/users');
		toast.success('Usuário adicionado');
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-6 bg-blue-200 space-y-6 h-screen">
				<header className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold">Usuários - Adicionar</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>

				<div className="bg-white p-6 rounded-lg shadow-md space-y-4">
					<div className="flex gap-2 border-b pb-3 border-gray-300">
						<img
							src={UserBlue}
							className="w-6"
							alt="" />
						<h2 className="font-semibold text-lg">
							Adicionar novo usuário ao sistema
						</h2>
					</div>

					<form
						id="create-client-form"
						className="grid grid-cols-2 gap-4 py-6 px-8"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col gap-1">
							<label className="font-semibold text-black" htmlFor="name">
								Nome
							</label>
							<input
								required
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="name"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label
								className="font-semibold text-black"
								htmlFor="document">
								Documento
							</label>
							<input
								required
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="document"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="number">
								Telefone
							</label>
							<input
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="number"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="city">
								Cidade
							</label>
							<input
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="city"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="email">
								Email
							</label>
							<input
								required
								className="p-2 border border-gray-300 rounded-lg"
								type="email"
								name="email"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="password">
								Senha
							</label>
							<input
								required
								className="p-2 border border-gray-300 rounded-lg"
								type="password"
								name="password"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="address">
								Endereço
							</label>
							<input
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="address"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" htmlFor="neighborhood">
								Bairro
							</label>
							<input
								className="p-2 border border-gray-300 rounded-lg"
								type="text"
								name="neighborhood"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label 
							className="font-semibold text-black" 
							htmlFor="userType">
								Tipo de usuário
							</label>
							<select
								className="p-2 border border-gray-300 rounded-lg"
								name="userType"
							>
								<option value="ADMIN">Admin</option>
								<option value="TECHNICIAN">Técnico</option>
							</select>
						</div>
					</form>

					<div className="flex justify-center mt-4">
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

export { CreateUser };
