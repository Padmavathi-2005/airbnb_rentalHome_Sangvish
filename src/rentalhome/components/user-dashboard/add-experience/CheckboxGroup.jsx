import React from "react";

export default function CheckboxGroup({ title, items, selectedItems, setSelectedItems }) {
  const handleChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-wrap -mx-2">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);

          return (
            <label
              key={item}
              className="flex items-start gap-2 px-2 w-1/3 mb-2 cursor-pointer"
            >
              {/* Fixed-size checkbox */}
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleChange(item)}
                  className="
                    h-6 w-6 rounded border-gray-400
                    checked:bg-red-600 checked:border-red-600
                    checked:text-white
                    accent-red-600
                    focus:ring-0
                    transition
                  "
                />
              </div>

              {/* Text aligned properly */}
              <span className="whitespace-normal leading-6">{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
