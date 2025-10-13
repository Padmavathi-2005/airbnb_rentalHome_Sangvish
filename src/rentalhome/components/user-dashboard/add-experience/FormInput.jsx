// components/FormInput.jsx
import React from "react";

export default function FormInput({
  label,
  icon: Icon, // icon component (e.g. from lucide-react)
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-3 py-2 rounded-md border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 outline-none`}
        />
      </div>
    </div>
  );
}
