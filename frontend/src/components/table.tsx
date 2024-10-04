import editIcon from '../public/assets/table/edit.svg';
import eyeIcon from '../public/assets/table/eye.svg';
import deleteIcon from '../public/assets/table/trash-2.svg';
import addIcon from '../public/assets/table/simbolo_mais.svg';
import { TablePagination } from '@mui/material';

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
}
const Table: React.FC<TableProps> = ({
	icon,
	title,
	columns,
	data,
	actions,
}) => {
	const edit = (rowData: string[]) => {
		alert(`Edit: ${rowData}`);
	};

	const view = (rowData: string[]) => {
		alert(`View: ${rowData}`);
	};

	const del = (rowData: string[]) => {
		alert(`Delete: ${rowData}`);
	};

	const handleChangePage = () =>
		//event: React.MouseEvent<HTMLButtonElement> | null,
		//newPage: number
		{
			// setPage(newPage);
		};

	const handleChangeRowsPerPage = () =>
		//event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		{
			// setRowsPerPage(parseInt(event.target.value, 10));
			// setPage(0);
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
									(cell: string, cellIndex: number) => (
										<td
											key={cellIndex}
											className="px-4 py-2 text-xs font-medium border-none underline"
										>
											{cell}
										</td>
									)
								)}
								{actions?.showActions ? (
									<td className="px-4 py-2 text-xs font-medium border-none flex gap-3">
										<button onClick={() => edit(row)}>
											<img src={editIcon} alt="Edit" />
										</button>
										<button onClick={() => view(row)}>
											<img src={eyeIcon} alt="View" />
										</button>
										<button onClick={() => del(row)}>
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
				{/* {actions?.showActions ? (
					<div className="w-full flex items-center justify-center p-2">
						<TablePagination
							component="div"
							count={25}
							page={1}
							rowsPerPage={10}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</div>
				) : null} */}
			</div>
		</div>
	);
};

export default Table;
