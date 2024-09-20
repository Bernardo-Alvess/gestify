import GestifyLogo from '../public/assets/gestify_simbolo.svg';
import Cuate from '../public/assets/login-page/cuate.svg';
import GestifyText from '../public/assets/gestify_texto.svg';

export const Login = () => {
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
					<form className="flex flex-col gap-10 items-center justify-center h-fit text-slate-600">
						<input
							type="text"
							placeholder="Email"
							name="email"
							className="border rounded-md w-96 p-3 border-primary"
						/>
						<div className="flex flex-col items-end gap-2">
							<input
								type="password"
								placeholder="Senha"
								name="password"
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
									<a
										href="#"
										className="decoration-none underline"
									>
										Acesse aqui
									</a>
								</span>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
