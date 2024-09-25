import React from 'react';

interface TableProps {
    icon: string;
    title: string;
    columns: string[];
    data: string[][];
};

const Table: React.FC<TableProps> = ({ icon, title, columns, data }) => {
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg">
            <div className="flex gap-2 p-2">
                <img className="w-5" src={icon} alt="Ícone da Tabela" />
                <p className="font-bold text-sm">{title}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            {columns.map((column: string, index: number) => (
                                <th key={index} className="px-4 py-2 text-left text-xs">{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: string[], index: number) => (
                            <tr key={index} className="hover:bg-gray-100">
                                {row.map((cell: string, cellIndex: number) => (
                                    <td key={cellIndex} className="px-4 py-2 text-xs font-medium border-none">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
