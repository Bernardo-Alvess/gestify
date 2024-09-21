import { useState } from 'react';
import { toast } from 'sonner';

import Bro from '../public/assets/signup-page/bro.svg';
import GestifyText from '../public/assets/gestify_texto.svg';
import { createCompany } from '../http/create-company';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		cnpj: '',
		corporateReason: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password.length < 8) {
			toast.error('Senha deve ter pelo menos 8 caracteres');
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error('Senhas não coincidem');
			return;
		}

		const { id, token } = await createCompany({
			cnpj: formData.cnpj,
			corporateReason: formData.corporateReason,
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});

		setCookie('jwt', token, { path: '/' });
		//#TODO: levar usuário para a home após fazer o cadastro, passando o id como query param, acrescentar
		//que o usuário cadastrado é owner no token, facilitar a minha vida ou piorar com tudo isso

		alert(`${id} ${token}`);

		navigate(`/home/${id}`);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<div className="flex justify-center items-center md:grid grid-cols-12 h-screen overflow-hidden">
			<div className="hidden h-screen col-span-7 bg-gray-100 md:flex flex-col justify-center items-center">
				<img src={Bro} alt="Chart" className="h-[400px] w-[600px]" />
			</div>
			<div className="h-screen w-fulll self-center col-span-5 flex flex-col items-center justify-center gap-10 md:shadow-2xl p-2">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-center flex-col h-fit">
						<img
							src={GestifyText}
							alt="logo do sistema Gestify"
							className="size-24 bg-white"
						/>
						<div className="text-center leading-relaxed ">
							<p className="text-center text-xl">
								<strong>
									REGISTRAR CONTA DE ADMINISTRADOR
								</strong>
							</p>
							<p className="text-base">
								Crie a sua conta e organize a sua equipe!
							</p>
						</div>
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 items-center justify-center h-fit text-slate-600"
					>
						<input
							type="text"
							placeholder="CNPJ *"
							name="cnpj"
							className="border rounded-md w-96 h-12 p-3 border-primary"
							required
							value={formData.cnpj}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Razão Social *"
							name="corporateReason"
							className="border rounded-md w-96 p-3 border-primary"
							required
							value={formData.corporateReason}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Nome Fantasia *"
							name="name"
							className="border rounded-md w-96 h-12 p-3 border-primary"
							required
							value={formData.name}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Email *"
							name="email"
							className="border rounded-md w-96 p-3 border-primary"
							required
							value={formData.email}
							onChange={handleChange}
						/>
						<input
							type="password"
							placeholder="Senha *"
							name="password"
							className="border rounded-md w-96 p-3 border-primary"
							required
							value={formData.password}
							onChange={handleChange}
						/>
						<input
							type="password"
							placeholder="Repetir Senha *"
							name="confirmPassword"
							className="border rounded-md w-96 p-3 border-primary"
							required
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
						<div className="flex flex-col items-center">
							<button
								type="submit"
								className="border bg-primary rounded-lg w-96 p-2 text-white text-xl"
							>
								Registre-se
							</button>
							<div className="flex w-full items-center">
								<div className="flex-grow border-t border-primary"></div>
								<span className="mx-4 text-gray-600">
									Já possui uma conta?
								</span>
								<div className="flex-grow border-t border-primary"></div>
							</div>
							<button className="border bg-primary rounded-lg w-96 p-2 text-white text-xl">
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
