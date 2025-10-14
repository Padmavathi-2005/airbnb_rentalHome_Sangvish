const ImportModal = ({ importForm, setImportForm, onSubmit, onClose, calendarColors }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Calendar Address (URL) <span className="text-red-500">*</span>
                </label>
                <input
                    type="url"
                    required
                    placeholder="https://bnbexp.letsdateme.com/icalender/export/479.ics"
                    value={importForm.url}
                    onChange={(e) => setImportForm({ ...importForm, url: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Calendar Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    placeholder="Enter calendar name"
                    value={importForm.name}
                    onChange={(e) => setImportForm({ ...importForm, name: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Color <span className="text-red-500">*</span>
                </label>
                <select
                    required
                    value={importForm.color}
                    onChange={(e) => setImportForm({ ...importForm, color: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                    {calendarColors.map((color) => (
                        <option key={color.value} value={color.value}>
                            {color.name}
                        </option>
                    ))}
                </select>
                <div className="mt-2 flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg border-2 border-gray-300"
                        style={{ backgroundColor: importForm.color }}
                    ></div>
                    <span className="text-sm text-gray-600">Selected color preview</span>
                </div>
            </div>
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
                >
                    Import
                </button>
            </div>
        </div>
    );
};

export default ImportModal;