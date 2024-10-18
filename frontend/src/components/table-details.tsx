import React, { ReactNode } from 'react';

interface Field {
    label: string;
    value: string;
    isTextarea?: boolean;
    placeholder?: string;
}

interface DetailsTableProps {
    fields: Field[];
    extraComponent?: ReactNode;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ fields, extraComponent }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg mb-4">Ordem de Serviço Nº 123</h2>
                <button
                    className="bg-green-100 text-green-400 border border-green-400 font-bold px-4 py-2 rounded-lg"
                >
                    Em Aberto
                </button>
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

                <div className="col-span-4 overflow-y-auto max-h-96">
                    {extraComponent}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Finalizar Ordem
                </button>
            </div>
        </div>
    );
};

export default DetailsTable;
