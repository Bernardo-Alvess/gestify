import React from "react";

interface InfoCardProps {
    icon: string;
    title: string;
    value: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => {
	return (
		<div className="bg-white p-2 border-2 rounded-xl flex items-center">
			<div className="w-1/3 flex justify-center">
				<img
					className="w-12 bg-blue-200 p-2 rounded-md fill-black"
					src={icon}
					alt={`Ícone ${title}`}
					loading="lazy"
				/>
			</div>
			<div className="w-0.5 h-12 bg-gray-300 mx-3"></div>
			<div className="w-2/3 text-center">
				<p className="text-gray-500 truncate">{title}</p>
				<p className="text-3xl font-bold text-black">{value}</p>
			</div>
		</div>
	);
};

export default InfoCard;
