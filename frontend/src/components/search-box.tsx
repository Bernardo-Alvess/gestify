import IconSearch from '../public/assets/home-page/icons/generic/search_icon.svg';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-60">
        <input
          type="text"
          placeholder={placeholder}
          className="border border-gray-300 rounded-lg px-8 py-1 h-7 w-72 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="off"
          onChange={handleChange}
        />
        <img
          src={IconSearch}
          alt="Buscar"
          className="absolute left-2 top-1.5 w-3 h-4 ml-1"
        />
      </div>
    </div>
  );
};

export default SearchBox;
