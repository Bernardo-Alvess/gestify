import { useParams } from 'react-router-dom';

export const Home = () => {
	const { id } = useParams();

	return <h1>{id}</h1>;
};
