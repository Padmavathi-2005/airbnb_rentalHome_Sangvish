const CalendarGrid = ({ days, onDateClick, getDateStyle, isPastDate }) => {
    return (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 mb-6 w-full">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                    <div
                        key={day}
                        className="flex items-center justify-center h-10 text-center font-semibold text-gray-600 text-xs md:text-sm"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
                {days.map((dayObj, idx) => {
                    const isPast = isPastDate(dayObj);
                    return (
                        <div
                            key={idx}
                            onClick={() => !isPast && onDateClick(dayObj)}
                            style={getDateStyle(dayObj)}
                            className={`flex items-center justify-center h-10 md:h-12 rounded-md text-xs md:text-sm transition-all ${!dayObj.isCurrentMonth
                                    ? "text-gray-300"
                                    : isPast
                                        ? "text-gray-400 cursor-not-allowed opacity-50"
                                        : "cursor-pointer hover:bg-purple-100 hover:scale-105"
                                }`}
                        >
                            {dayObj.day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;
