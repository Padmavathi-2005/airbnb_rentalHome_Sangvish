const FilterSection = ({ title, children }) => (
    <div className="space-y-4">
        {title && <h3 className="font-semibold text-base">{title}</h3>}
        {children}
        <div className="border-t border-gray-200 my-4"></div>
    </div>
);

export default FilterSection;
