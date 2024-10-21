import React, { ReactNode, useState } from 'react';

interface Field {
    label: string;
    value: string;
    placeholder?: string;
    isTextarea?: boolean;
}

interface DetailsTableProps {
    fields: Field[];
    orderId: string;
    extraComponent?: ReactNode;
    textButton: string;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ fields, extraComponent, orderId, textButton, }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const getSelectClass = () => {
        switch (selectedOption) {
            case 'Em Aberto':
                return 'bg-green-100 text-green-400 border border-green-400';
            case 'Orçamento':
                return 'bg-yellow-100 text-yellow-600 border border-yellow-600';
            case 'Finalizado':
                return 'bg-blue-100 text-blue-600 border border-blue-400';
            case 'Cancelado':
                return 'bg-red-200 text-red-600 border border-red-600';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg mb-4">Ordem de Serviço Nº{orderId}</h2>
                <select
                    className={`font-bold px-4 py-2 rounded-lg ${getSelectClass()}`}
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="">Status</option>
                    <option value="Em Aberto">Em Aberto</option>
                    <option value="Orçamento">Orçamento</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8 grid grid-cols-2 gap-2">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-bold">{field.label}</label>
                            {field.isTextarea ? (
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg max-h-24"
                                    placeholder={field.placeholder}
                                    defaultValue={field.value}
                                />
                            ) : field.label === 'Data de abertura' ? (
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg max-h-24"
                                    defaultValue={field.value}
                                />
                            ) : (
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-lg max-h-12"
                                    value={field.value}
                                    readOnly
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="col-span-4 overflow-y-auto border rounded-xl shadow-lg max-h-screen">
                    {extraComponent}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {textButton}
                </button>
            </div>
        </div>
    );
};

export default DetailsTable;
