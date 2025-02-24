import editIcon from '../public/assets/table/edit.svg';
import eyeIcon from '../public/assets/table/eye.svg';
import deleteIcon from '../public/assets/table/trash-2.svg';
import addIcon from '../public/assets/table/simbolo_mais.svg';
import { useNavigate } from 'react-router-dom';
import { assignRelationId } from '../data/relation-id';

interface TableProps {
	icon: string;
	title: string;
	columns: string[];
	data: Record<string, any>[];
	actions?: {
		showActions: boolean;
		actionButtonText: string;
		action: () => void;
		deleteAction: (id: string) => void;
		editAction?: () => void;
	};
	viewPage?: string;
	editPage?: string;
}

const Table: React.FC<TableProps> = ({
	icon,
	title,
	columns,
	data,
	actions,
	viewPage,
	editPage,
}) => {
	const navigate = useNavigate();

	const edit = (rowData: Record<string, any>) => {
		navigate(`${editPage}/${rowData.id}`);
	};

	const view = (rowData: Record<string, any>) => {
		navigate(`${viewPage}/${rowData.id}`);
	};

	const del = (rowData: Record<string, any>) => {
		actions?.deleteAction(rowData.id);
	};

	const editAction = (rowData: Record<string, any>) => {
		if (actions?.editAction) {
			assignRelationId(rowData.companyId);
			actions.editAction();
		}
	};

	function isDateString(dateString: string): boolean {
		if (typeof dateString == 'number') return false;
		return !isNaN(Date.parse(dateString));
	}

	function formatDateToUTC(dateString: string): string {
		const date = new Date(dateString); // Cria o objeto Date
		// Extraia o dia, mês e ano diretamente no UTC
		const day = date.getUTCDate().toString().padStart(2, '0');
		const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // UTCMonth é 0-indexado
		const year = date.getUTCFullYear();
		return `${day}/${month}/${year}`;
	}

	return (
		<div className="bg-white p-4 rounded-lg shadow-lg w-full overflow-y-auto h-full">
			<div className="flex justify-between items-center p-2">
				<div className="flex gap-2">
					<img className="w-5" src={icon} alt="Ícone da Tabela" />
					<p className="font-bold text-sm">{title}</p>
				</div>
				{actions?.showActions ? (
					<button
						type="button"
						onClick={actions.action}
						className="font-bold rounded-lg bg-blue-200 p-1 flex justify-center items-center hover:bg-blue-400 transition-colors"
					>
						<span className="flex gap-2">
							<img src={addIcon} alt="+" />
							{actions.actionButtonText}
						</span>
					</button>
				) : null}
			</div>
			<div className="overflow-x-auto w-full">
				<table className="min-w-full table-auto border-collapse w-full ">
					<thead>
						<tr>
							{columns.map((column: string, index: number) => (
								<th
									key={index}
									className="px-4 py-2 text-center text-xs underline"
								>
									{column}
								</th>
							))}
							{actions?.showActions ? (
								<th className="px-4 py-2 text-center text-xs underline">
									Ações
								</th>
							) : null}
						</tr>
					</thead>
					<tbody>
						{data.map((row: Record<string, any>, index: number) => (
							<tr key={index} className="hover:bg-gray-100">
								{Object.values(row).map(
									(cell: any, cellIndex: number) => (
										<td
											key={cellIndex}
											className={`px-4 py-2 text-xs font-medium border-none underline truncate text-center max-w-[80px] text-gray-700 decoration-purple-900`}
										>
											{isDateString(cell)
												? formatDateToUTC(cell)
												: cell
												? cell
												: 'N/A'}{' '}
										</td>
									)
								)}
								{actions?.showActions ? (
									<td className="px-4 py-2 text-xs font-medium border-none flex gap-1 items-center justify-center">
										{actions.editAction ? (
											<button
												type="button"
												className="size-7"
												onClick={() => editAction(row)}
											>
												<img
													src={editIcon}
													alt="Edit"
												/>
											</button>
										) : (
											<button
												type="button"
												className="size-7"
												onClick={() => edit(row)}
											>
												<img
													src={editIcon}
													alt="Edit"
												/>
											</button>
										)}

										<button
											type="button"
											className="size-7"
											onClick={() => view(row)}
										>
											<img src={eyeIcon} alt="View" />
										</button>
										<button
											type="button"
											className="size-7"
											onClick={() => del(row)}
										>
											<img
												src={deleteIcon}
												alt="Delete"
											/>
										</button>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
