//imports fixos
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useContext, useState } from 'react';

//imports locais
import GestifyLogo from '../public/assets/gestify_simbolo.svg';
import Cuate from '../public/assets/login-page/cuate.svg';
import GestifyText from '../public/assets/gestify_texto.svg';
import { loginUser } from '../http/login';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';

export const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(['jwt', 'id']);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password.length < 8) {
			toast.error('Senha deve ter pelo menos 8 caracteres');
			return;
		}

		const { logged } = await loginUser({
			email: formData.email,
			password: formData.password,
		});

		if (!logged) {
			toast.error('Erro ao entrar na conta');
			return;
		}

		// setCookie('id', cookies.id, { path: '/', maxAge: 3 * 24 * 60 * 60 });
		// setCookie('jwt', cookies.jwt, { path: '/', maxAge: 3 * 24 * 60 * 60 });

		console.log(cookies);
		login();
		navigate(`/home/${cookies.id}`);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<div className="flex justify-center items-center md:grid grid-cols-12 h-screen overflow-hidden">
			<div className="hidden h-screen col-span-7 bg-gray-100 md:flex flex-col justify-center items-center">
				<img
					src={GestifyText}
					alt="Nome do Gestify"
					className="size-24"
				/>
				<img src={Cuate} alt="Chart" className="h-[400px] w-[600px]" />
			</div>
			<div className="h-screen w-full self-center col-span-5 flex flex-col items-center justify-center gap-10 md:shadow-2xl">
				<div className="flex flex-col gap-10">
					<div className="flex items-center justify-center flex-col h-fit gap-5 ">
						<img
							src={GestifyLogo}
							alt="logo do sistema Gestify"
							className="h-[77px] w-[53px]"
						/>
						<p className="max-w-[374px] leading-relaxed text-center">
							Bem vindo ao{' '}
							<span className="text-primary ">Gestify</span>,
							Sistema de Controle de Ordens de Serviço
						</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-10 items-center justify-center h-fit text-slate-600"
					>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="border rounded-md w-96 p-3 border-primary"
						/>
						<div className="flex flex-col items-end gap-2">
							<input
								type="password"
								placeholder="Senha"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								className="border rounded-md w-96 p-3 border-primary"
							/>
							<a
								href="#"
								className="text-slate-600 text-sm underline decoration-none"
							>
								Esqueci minha senha
							</a>
						</div>
						<div className="flex flex-col items-center gap-2">
							<button
								type="submit"
								className="border bg-primary rounded-lg w-96 p-2 text-white text-xl"
							>
								Entrar
							</button>
							<p className="text-base">
								Primeiro acesso?{' '}
								<span className="text-primary">
									<Link
										to="/signup"
										className="decoration-none underline"
									>
										Acesse aqui
									</Link>
								</span>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};