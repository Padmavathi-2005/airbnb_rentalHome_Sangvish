const CheckboxGrid = ({ items, selected, onToggle, columns = 2 }) => (
  <div className={`grid grid-cols-${columns} gap-3`}>
    {items.map((item, idx) => (
      <label
        key={idx}
        className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-all border border-gray-200 hover:border-gray-300"
      >
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 accent-[var(--theme-color)] focus:ring-0"
          checked={selected.includes(idx)}
          onChange={() => onToggle(idx)}
        />
        <span>{item.label || item}</span>
      </label>
    ))}
  </div>
);

export default CheckboxGrid;
