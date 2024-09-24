import Sidebar from '../components/sidebar';
import TopNav from '../components/top_nav';

export const Products = () => {
	const today = new Date().toLocaleDateString('pt-BR');

	return (
		<div className="flex h-screen">
			<Sidebar />
			<main className="flex-1 p-10 bg-blue-200 space-y-10">
				<header className="flex justify-between">
					<div className="pt-16 md:pt-16 lg:pt-0">
						<h1 className="text-2xl font-bold">Dashboard</h1>
						<p className="text-sm text-gray-500">{today}</p>
					</div>
					<TopNav />
				</header>
			</main>
		</div>
	);
};
