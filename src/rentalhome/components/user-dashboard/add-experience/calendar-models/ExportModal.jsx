const ExportModal = ({ copied, onCopy, onClose }) => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Copy and paste the link into other ICAL applications
            </p>
            <div className="flex gap-2">
                <input
                    type="text"
                    readOnly
                    value="https://bnbexp.letsdateme.com/icalender/export/479.ics"
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-sm"
                />
                <button
                    onClick={onCopy}
                    className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                    {copied ? '✓' : 'Copy'}
                </button>
            </div>
            {copied && (
                <p className="text-sm text-green-600 font-semibold">✓ Copied to clipboard!</p>
            )}
            <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition mt-4"
            >
                Close
            </button>
        </div>
    );
};

export default ExportModal;