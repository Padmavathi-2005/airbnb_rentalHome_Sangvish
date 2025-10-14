const ImportedCalendarsTable = ({ calendars, onDelete }) => {
    if (calendars.length === 0) return null;

    return (
        <div className="mb-4 overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left font-medium border-b">Date</th>
                        <th className="p-2 text-left font-medium border-b">Calendar URL</th>
                        <th className="p-2 text-left font-medium border-b">Calendar Name</th>
                        <th className="p-2 text-left font-medium border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {calendars.map((cal) => (
                        <tr
                            key={cal.id}
                            style={{ backgroundColor: cal.color + '20' }}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="p-2">{cal.date}</td>
                            <td className="p-2 truncate max-w-[160px]" title={cal.url}>
                                {cal.url}
                            </td>
                            <td className="p-2 font-medium">{cal.name}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => onDelete(cal.id)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImportedCalendarsTable;
