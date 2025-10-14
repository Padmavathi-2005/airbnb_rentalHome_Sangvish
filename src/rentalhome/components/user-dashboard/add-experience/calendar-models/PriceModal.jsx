const PriceModal = ({ priceForm, setPriceForm, onSubmit, onClose }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={priceForm.startDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setPriceForm({ ...priceForm, startDate: e.target.value })}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={priceForm.endDate}
          min={priceForm.startDate || new Date().toISOString().split('T')[0]}
          onChange={(e) => setPriceForm({ ...priceForm, endDate: e.target.value })}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          required
          placeholder="Enter price"
          value={priceForm.price}
          onChange={(e) => setPriceForm({ ...priceForm, price: e.target.value })}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={priceForm.status}
          onChange={(e) => setPriceForm({ ...priceForm, status: e.target.value })}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
        >
          <option value="available">Available</option>
          <option value="not-available">Not Available</option>
        </select>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PriceModal;