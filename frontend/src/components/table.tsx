import editIcon from '../public/assets/table/edit.svg';
import eyeIcon from '../public/assets/table/eye.svg';
import deleteIcon from '../public/assets/table/trash-2.svg';
import addIcon from '../public/assets/table/simbolo_mais.svg';
import { useNavigate } from 'react-router-dom';

interface TableProps {
	icon: string;
	title: string;
	columns: string[];
	data: Record<string, any>[];
	actions?: {
		showActions: boolean;
		actionButtonText: string;
		action: () => void;
	};
	viewPage?: string;
	editPage?: string;
	deleteAction?: string;
}
const Table: React.FC<TableProps> = ({
	icon,
	title,
	columns,
	data,
	actions,
	viewPage,
	editPage,
	deleteAction,
}) => {
	const navigate = useNavigate();

	const edit = (rowData: Record<string, any>) => {
		navigate(`${editPage}/${rowData.id}`);
	};

	const view = (rowData: Record<string, any>) => {
		navigate(`${viewPage}/${rowData.id}`);
	};

	const del = (rowData: Record<string, any>) => {
		alert(`Delete: ${deleteAction}`);
	};

	return (
		<div className="bg-white p-4 rounded-lg shadow-lg w-full overflow-y-auto">
			<div className="flex justify-between items-center p-2">
				<div className="flex gap-2">
					<img className="w-5" src={icon} alt="Ícone da Tabela" />
					<p className="font-bold text-sm">{title}</p>
				</div>
				{actions?.showActions ? (
					<button
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
									className="px-4 py-2 text-left text-xs underline"
								>
									{column}
								</th>
							))}
							{actions?.showActions ? (
								<th className="px-4 py-2 text-left text-xs underline">
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
											className="px-4 py-2 text-xs font-medium border-none underline truncate text-left"
										>
											{cell ? cell : 'N/A'}
										</td>
									)
								)}
								{actions?.showActions ? (
									<td className="px-4 py-2 text-xs font-medium border-none flex gap-1">
										<button
											className="size-7"
											onClick={() => edit(row)}
										>
											<img src={editIcon} alt="Edit" />
										</button>
										<button
											className="size-7"
											onClick={() => view(row)}
										>
											<img src={eyeIcon} alt="View" />
										</button>
										<button
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
