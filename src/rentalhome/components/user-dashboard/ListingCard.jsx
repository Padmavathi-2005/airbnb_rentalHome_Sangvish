import React from "react";
import { ReceiptText, Banknote, X } from "lucide-react";

const ListingCard = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return <p>No listings available</p>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow p-4 gap-4"
        >
          {/* Cover Photo */}
          <img
            src={item.cover_photo || "/placeholder.png"}
            alt={item.name || "Listing"}
            className="w-full md:w-48 h-40 object-cover rounded-lg"
          />

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.property_address?.address_line_1 || "Address not available"}
              </p>
              <p className="text-xs mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    item.status === "Listed" ? "bg-green-600" : "bg-gray-500"
                  }`}
                >
                  {item.status || "Unknown"}
                </span>
              </p>

              <p className="text-sm mt-2">
                Price: {item.property_price?.currency_code}{" "}
                {item.property_price?.price || 0}
              </p>

              <p className="text-sm mt-1 text-gray-600">
                Host: {item.host_name || "Unknown"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
                <ReceiptText size={16} /> View Receipt
              </button>

              <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
                <Banknote size={16} /> Stripe
              </button>

              {item.status !== "Listed" && (
                <button className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
                  <X size={16} /> Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingCard;
