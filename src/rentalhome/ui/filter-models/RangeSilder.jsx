const RangeSlider = ({ min, max, step, values, onChange }) => {
  const [minValue, maxValue] = values;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    onChange([value, maxValue]);
  };
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    onChange([minValue, value]);
  };

  return (
    <div className="relative pt-2 pb-6">
      <div className="relative w-full h-1">
        <div className="absolute top-0 bottom-0 w-full rounded-full bg-gray-300" />
        <div
          className="absolute top-0 bottom-0 rounded-full bg-theme"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        />
        <input type="range" min={min} max={max} step={step} value={minValue} onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
          [&::-webkit-slider-thumb]:border-theme [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md" />
        <input type="range" min={min} max={max} step={step} value={maxValue} onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
          [&::-webkit-slider-thumb]:border-theme [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-md" />
      </div>
    </div>
  );
};

export default RangeSlider;
