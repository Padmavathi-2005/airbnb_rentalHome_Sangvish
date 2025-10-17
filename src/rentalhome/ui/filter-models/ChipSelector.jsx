const ChipSelector = ({ items, selected, onToggle }) => (
  <div className="flex flex-wrap gap-2 sm:gap-3">
    {items.map((item, idx) => (
      <button
        key={idx}
        onClick={() => onToggle(idx)}
        className={`cursor-pointer flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-sm ${
          selected.includes(idx)
            ? 'bg-theme-30'
            : 'bg-white border border-gray-300 hover:border-gray-400'
        }`}
      >
        {item.icon && (
          <span className="p-1 sm:p-1.5 rounded-md bg-white shadow-md">
            <span className={selected.includes(idx) ? 'text-theme' : 'text-gray-600'}>
              {item.icon}
            </span>
          </span>
        )}
        <span className="font-medium text-gray-700">{item.label || item.name}</span>
      </button>
    ))}
  </div>
);

export default ChipSelector;
