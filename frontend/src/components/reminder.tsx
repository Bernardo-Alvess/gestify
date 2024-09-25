import IconPlus from '../public/assets/home-page/icons/generic/plus_icon.svg';
import IconMenuDots from '../public/assets/home-page/icons/generic/ellipses_icon.svg';
import IconServices from '../public/assets/home-page/icons/services/services_icon_g.svg';
import IconUsers from '../public/assets/home-page/icons/users/user_icon.svg';
import IconDate from '../public/assets/home-page/icons/generic/date_icon.svg';
import IconDelete from '../public/assets/home-page/icons/generic/delete_icon.svg';
import { useState } from 'react';


interface Reminder {
    code: string;
    title: string;
    client: string;
    date: string;
}

interface ReminderProps {
    reminders: Reminder[];
    addReminder: (reminder: Reminder) => void;
    removeReminder: (index: number) => void; // Nova prop para remover lembrete
}

const Reminder: React.FC<ReminderProps> = ({ reminders, addReminder, removeReminder }) => {
    const [newCode, setNewCode] = useState<string>('');
    const [newTitle, setNewTitle] = useState<string>('');
    const [newClient, setNewClient] = useState<string>('');
    const [newDate, setNewDate] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleAddReminder = () => {
        if (newCode && newTitle && newClient && newDate) {
            const newReminder: Reminder = {
                code: newCode,
                title: newTitle,
                client: newClient,
                date: newDate,
            };
            addReminder(newReminder);
            setNewCode('');
            setNewTitle('');
            setNewClient('');
            setNewDate('');
            setShowInput(false);
        }
    };

    return (
        <div className="bg-white p-2 rounded-xl flex flex-col">
            <div className="flex justify-between">
                <p className="font-bold p-2 text-sm">Lembretes</p>
                <div className="flex items-center gap-1">
                    <p className="bg-blue-200 font-bold text-blue-700 text-sm rounded-full w-4 h-4 flex items-center justify-center">
                        {reminders.length}
                    </p>
                    <img
                        className='w-5 cursor-pointer'
                        src={IconPlus}
                        alt="Ícone Adicionar Lembrete"
                        onClick={() => setShowInput(!showInput)}
                    />
                    <img
                        className="w-5 cursor-pointer"
                        src={IconMenuDots}
                        alt="Ícone Opções Lembrete"
                        onClick={() => setShowDelete(!showDelete)}
                    />
                </div>
            </div>
            {showInput && (
                <>
                    <input
                        type="text"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        placeholder="Código"
                        className="border p-1 rounded mb-2"
                    />
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Título do Lembrete"
                        className="border p-1 rounded mb-2"
                    />
                    <input
                        type="text"
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        placeholder="Cliente"
                        className="border p-1 rounded mb-2"
                    />
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="border p-1 rounded mb-2"
                    />
                    <button
                        onClick={handleAddReminder}
                        className="bg-blue-500 text-white rounded px-2 py-1"
                    >
                        Adicionar
                    </button>
                </>
            )}
            <ul className="mt-2">
                {reminders.map((reminder, index) => (
                    <li
                        key={index}
                        className="bg-blue-200 rounded-lg border-2 shadow-lg border-gray-400 p-2 text-xs mb-2"
                    >
                        <div className="flex text-xs gap-1 mb-1">
                            <img className="w-4" src={IconServices} alt="" />
                            <span className="font-bold">{reminder.code}</span>
                            <span className="font-bold">{reminder.title}</span>
                        </div>

                        <div className="flex items-center mb-1">
                            <img className="w-4 mr-1" src={IconUsers} alt="" />
                            <span>{reminder.client}</span>
                        </div>
                        <div className="flex items-center mb-1">
                            <img className="w-4 mr-1" src={IconDate} alt="" />
                            <span>{reminder.date}</span>
                            {showDelete && (
                            <button
                                onClick={() => removeReminder(index)}
                                className="ml-auto "
                            >
                                <img className="w-4" src={IconDelete} alt="Delete Icon " />
                            </button>
                        )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Reminder;
