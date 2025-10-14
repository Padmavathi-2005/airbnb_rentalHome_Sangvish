import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './calendar-models/CalendarGrid';
import ImportedCalendarsTable from './calendar-models/ImportedCalendarsTable';
import Modal from './calendar-models/Modal';
import PriceModal from './calendar-models/PriceModal';
import ImportModal from './calendar-models/ImportModal';
import ExportModal from './calendar-models/ExportModal';


const Calendar = ({ setNav }) => {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [syncSuccess, setSyncSuccess] = useState(false);

    const [datePrices, setDatePrices] = useState({});
    const [importedCalendars, setImportedCalendars] = useState([]);

    const [priceForm, setPriceForm] = useState({
        startDate: '',
        endDate: '',
        price: '',
        status: 'available'
    });

    const [importForm, setImportForm] = useState({
        url: '',
        name: '',
        color: '#8B5CF6'
    });

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const calendarColors = [
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Orange', value: '#F59E0B' },
        { name: 'Red', value: '#EF4444' }
    ];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // const generateCalendarDays = () => {
    //     const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    //     const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    //     const days = [];

    //     const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    //     const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    //     const prevMonthDays = getDaysInMonth(prevYear, prevMonth);

    //     for (let i = firstDay - 1; i >= 0; i--) {
    //         days.push({ day: prevMonthDays - i, isCurrentMonth: false, month: prevMonth, year: prevYear });
    //     }

    //     for (let i = 1; i <= daysInMonth; i++) {
    //         days.push({ day: i, isCurrentMonth: true, month: currentMonth, year: currentYear });
    //     }

    //     const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    //     const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    //     const remainingDays = 42 - days.length;
    //     for (let i = 1; i <= remainingDays; i++) {
    //         days.push({ day: i, isCurrentMonth: false, month: nextMonth, year: nextYear });
    //     }

    //     return days;
    // };
    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                month: currentMonth,
                year: currentYear,
            });
        }

        return days;
    };

    const isPastDate = (dayObj) => {
        const dateToCheck = new Date(dayObj.year, dayObj.month, dayObj.day);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return dateToCheck < todayDate;
    };

    const handleDateClick = (day) => {
        if (day.isCurrentMonth && !isPastDate(day)) {
            const dateStr = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;
            setPriceForm({
                startDate: dateStr,
                endDate: dateStr,
                price: '',
                status: 'available'
            });
            setShowPriceModal(true);
        }
    };

    const handlePriceSubmit = () => {
        if (!priceForm.startDate || !priceForm.endDate || !priceForm.price) return;

        const newPrices = { ...datePrices };
        const start = new Date(priceForm.startDate);
        const end = new Date(priceForm.endDate);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            newPrices[dateStr] = {
                price: priceForm.price,
                status: priceForm.status
            };
        }

        setDatePrices(newPrices);
        setShowPriceModal(false);
    };

    const handleImportSubmit = () => {
        if (!importForm.url || !importForm.name) return;

        const newCalendar = {
            id: Date.now(),
            url: importForm.url,
            name: importForm.name,
            color: importForm.color,
            date: new Date().toLocaleDateString()
        };
        setImportedCalendars([...importedCalendars, newCalendar]);
        setImportForm({ url: '', name: '', color: '#8B5CF6' });
        setShowImportModal(false);
    };

    const handleSync = () => {
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 2000);
    };

    const handleCopyUrl = () => {
        const exportUrl = 'https://bnbexp.letsdateme.com/icalender/export/479.ics';
        navigator.clipboard.writeText(exportUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const deleteCalendar = (id) => {
        setImportedCalendars(importedCalendars.filter(cal => cal.id !== id));
    };

    const getDateStyle = (day) => {
        if (!day.isCurrentMonth) return {};

        const dateStr = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`;

        if (datePrices[dateStr]) {
            if (datePrices[dateStr].status === 'available') {
                return { backgroundColor: '#10B981', color: 'white' };
            } else {
                return { backgroundColor: '#EF4444', color: 'white' };
            }
        }

        return {};
    };

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const days = generateCalendarDays();

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 my-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Year and Month Selector */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setCurrentYear(currentYear - 1)}
                                className="p-2 hover:bg-white rounded-lg transition"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-xl font-bold text-gray-700">{currentYear}</span>
                            <button
                                onClick={() => setCurrentYear(currentYear + 1)}
                                className="p-2 hover:bg-white rounded-lg transition"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {monthNames.map((month, idx) => (
                                <div
                                    key={month}
                                    onClick={() => setCurrentMonth(idx)}
                                    className={`p-3 rounded-lg text-center cursor-pointer transition ${currentMonth === idx
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold'
                                        : 'bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Calendar */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {monthNames[currentMonth]} {currentYear}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={previousMonth}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <CalendarGrid
                        days={days}
                        onDateClick={handleDateClick}
                        getDateStyle={getDateStyle}
                        isPastDate={isPastDate}
                    />

                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={handleSync}
                            className="flex-1 min-w-[180px] bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition text-sm"
                        >
                            {syncSuccess ? '✓ Synced Successfully!' : 'Sync with other Calendars'}
                        </button>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="flex-1 min-w-[180px] bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition text-sm"
                        >
                            Import Calendar
                        </button>
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="flex-1 min-w-[180px] bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition text-sm"
                        >
                            Export Calendar
                        </button>
                    </div>

                    <ImportedCalendarsTable
                        calendars={importedCalendars}
                        onDelete={deleteCalendar}
                    />

                    <div className="flex justify-between">
                        <button
                            onClick={() => setNav('Booking')}
                            className="px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => setNav('City')}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                show={showPriceModal}
                onClose={() => setShowPriceModal(false)}
                title="Set price for particular dates"
                size="md"
            >
                <PriceModal
                    priceForm={priceForm}
                    setPriceForm={setPriceForm}
                    onSubmit={handlePriceSubmit}
                    onClose={() => setShowPriceModal(false)}
                />
            </Modal>

            <Modal
                show={showImportModal}
                onClose={() => setShowImportModal(false)}
                title="Import a New Calendar"
                size="md"
            >
                <ImportModal
                    importForm={importForm}
                    setImportForm={setImportForm}
                    onSubmit={handleImportSubmit}
                    onClose={() => setShowImportModal(false)}
                    calendarColors={calendarColors}
                />
            </Modal>

            <Modal
                show={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Export Calendar"
                size="md"
            >
                <ExportModal
                    copied={copied}
                    onCopy={handleCopyUrl}
                    onClose={() => setShowExportModal(false)}
                />
            </Modal>
        </div>
    );
};

export default Calendar;