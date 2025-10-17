const ToggleButtonGroup = ({ options, selected, onChange }) => (
    <div className="flex flex-col sm:flex-row gap-2 p-1 bg-theme-30 rounded-full">
        {options.map((opt) => (
            <button
                key={opt.value || opt}
                onClick={() => onChange(opt.value || opt)}
                className={`flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${selected === (opt.value || opt)
                        ? 'bg-theme text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                {opt.label || opt}
            </button>
        ))}
    </div>
);

export default ToggleButtonGroup;
