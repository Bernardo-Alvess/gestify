import { useNavigate } from 'react-router-dom';
import IconBackBlue from '../public/assets/home-page/icons/generic/back_icon_b.svg';

interface Props {
	route: string;
}

const BackPageButton = (data: Props) => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-start">
			<button
				className="bg-white p-2 rounded-lg"
				onClick={() => {
					navigate(data.route);
				}}
			>
				<img className="w-4" src={IconBackBlue} alt="" />
			</button>
		</div>
	);
};

export { BackPageButton };
