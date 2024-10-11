import IconSearch from '../public/assets/home-page/icons/generic/search_icon.svg';

const SearchBox = () => {
    return (
		<div className="flex justify-center">
			<div className="relative w-60">
				<input
					type="text"
					placeholder="Pesquisar..."
					className="border border-gray-300 rounded-lg px-8 py-1 h-7 w-72 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
					autoComplete="none"
				/>
				<img
					src={IconSearch}
					alt="Buscar"
					className="absolute left-2 top-1.5 w-3 h-4 ml-1"
				/>{' '}
				{/* Ícone de busca */}
			</div>
		</div>
	);
};

export default SearchBox;
