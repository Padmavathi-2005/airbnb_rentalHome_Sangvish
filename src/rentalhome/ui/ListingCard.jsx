import React from "react";
import { User2, Calendar, MessageCircleMore } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ListingCard({ items = [], message }) {
  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence>
        {items.map((item, id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl flex flex-col sm:flex-row sm:items-start gap-4 p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Status Button */}
            <button
              className={`absolute right-3 top-3 ${item.statusClass} font-semibold flex items-center gap-2 py-1 px-3 text-xs sm:text-sm rounded-full shadow-sm`}
            >
              {item.status}
            </button>

            {/* Image */}
            <div className="w-full sm:w-48 md:w-56 flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 sm:h-40 md:h-44 rounded-xl object-cover shadow-md"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between text-center sm:text-left gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.location}</p>
              </div>

              <div className="flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-700">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  {item.from} – {item.to}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                {item.actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${action.class} transition duration-200`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center justify-center gap-2 mt-3 sm:mt-0 min-w-[100px] sm:min-w-[140px]">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.host}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover bg-gray-200 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gray-100 shadow-sm">
                  <User2 className="h-8 w-8 text-gray-500" />
                </div>
              )}
              <span className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-center">
                {item.host}
              </span>

              {message && (
                <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-3 py-1 text-xs transition">
                  <MessageCircleMore className="w-4 h-4" />
                  <span>Message</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ListingCard;
