import success from '../public/assets/modals/success/success.svg';

interface ISuccessModalProps {
	toggle: boolean;
	onClose: () => void;
	message: string;
}

const SuccessModal = ({ toggle, message, onClose }: ISuccessModalProps) => {
	if (!toggle) return null;
	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
			onClick={onClose}
		>
			<div
				className="bg-white p-4 rounded-lg shadow-lg h-96 w-full max-w-md flex items-center justify-between flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-center">
					<img className="" src={success} />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-primary">
						{message}
					</h1>
				</div>
				<button
					onClick={onClose}
					className="w-40 p-2 text-center text-2xl font-bold bg-primary text-white rounded-lg"
				>
					OK
				</button>
			</div>
		</div>
	);
};

export default SuccessModal;
