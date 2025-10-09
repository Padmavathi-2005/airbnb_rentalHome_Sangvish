import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Search, Trash2 ,Wallet,FilePenLine} from "lucide-react";
import balanceBg from '../../../../assets/images/balance-bg.png'
import Model from "../../../ui/Model";

// Dummy API function
function fetchPayouts({ page, perPage, search }) {
  // Fake API response (simulate network with Promise)
  const all = [
    {
      method: "Bank",
      name:"vijay",
      bank:"Canara Bank",
      details: "1234 5678 1236",
      status: "Active",
    },
    {
      method: "Bank",
      name:"vijay",
      bank:"Canara Bank",
      details: "1234 5678 1236",
      status: "Active",
    },   
    // ...more rows...
  ].filter(
    (row) =>
      !search || row.details.includes(search)
  );

  const start = (page - 1) * perPage;
  const paged = all.slice(start, start + perPage);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: paged,
        total: all.length
      });
    }, 280);
  });
}

const perPageOptions = [10, 25, 50];

export default function PayoutMethods() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
     const [currentRow, setCurrentRow] = useState(null);


  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetchPayouts({ page, perPage, search }).then((res) => {
      setRows(res.data);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page, perPage, search]);

  const totalPages = Math.ceil(total / perPage);



  function PaymentMethodForm({data}){
    

    const countries = [
    "Afghanistan", "India", "United States", "Germany", "Australia"
    // ...add more as needed
    ];
     const [values, setValues] = useState({
    payout: "Bank",
    bankName: data.bank,
    holder: data.name,
    branch: "",
    iban: "",
    branchCity: "",
    swift1: "",
    address: "",
    country: "Afghanistan",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!values.bankName) errs.bankName = "Required";
    if (!values.holder) errs.holder = "Required";
    if (!values.branch) errs.branch = "Required";
    if (!values.iban) errs.iban = "Required";
    if (!values.branchCity) errs.branchCity = "Required";
    if (!values.swift1) errs.swift1 = "Required";
    if (!values.address) errs.address = "Required";
    return errs;
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Payment method submitted!");
      setValues({
        payout: "Bank", bankName: "", holder: "", branch: "",
        iban: "", branchCity: "", swift1: "", address: "", country: "Afghanistan"
      });
    }
  }

    return(
        <form className="mt-3" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col"
            >
                <label className="mb-1 font-medium text-gray-800">Payout method</label>
                <select
                name="payout"
                className="rounded-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700"
                value={values.payout}
                onChange={handleChange}
                >
                <option>Bank</option>
                <option>UPI</option>
                <option>Paypal</option>
                </select>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col"
            >
                <label className="mb-1 font-medium text-gray-800">Bank Name</label>
                <input
                name="bankName"
                type="text"
                value={values.bankName}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.bankName ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.bankName && <span className="text-xs text-red-500">{errors.bankName}</span>}
            </motion.div>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Bank Account Holder Name</label>
                <input
                name="holder"
                type="text"
                value={values.holder}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.holder ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.holder && <span className="text-xs text-red-500">{errors.holder}</span>}
            </motion.div>
            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Branch Name</label>
                <input
                name="branch"
                type="text"
                value={values.branch}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.branch ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.branch && <span className="text-xs text-red-500">{errors.branch}</span>}
            </motion.div>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Bank Account / IBAN</label>
                <input
                name="iban"
                type="text"
                value={values.iban}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.iban ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.iban && <span className="text-xs text-red-500">{errors.iban}</span>}
            </motion.div>
            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Branch City</label>
                <input
                name="branchCity"
                type="text"
                value={values.branchCity}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.branchCity ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.branchCity && <span className="text-xs text-red-500">{errors.branchCity}</span>}
            </motion.div>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Swift Code</label>
                <input
                name="swift1"
                type="text"
                value={values.swift1}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.swift1 ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.swift1 && <span className="text-xs text-red-500">{errors.swift1}</span>}
            </motion.div>
            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-800">Address       </label>
                <input
                name="address"
                type="text"
                value={values.address}
                onChange={handleChange}
                className={`rounded-full px-3 py-2 bg-gray-50 border ${errors.address ? "border-red-400" : "border-gray-200"} text-gray-700`}
                />
                {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
            </motion.div>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex flex-col md:col-span-2">
                <label className="mb-1 font-medium text-gray-800">Country</label>
                <select
                name="country"
                value={values.country}
                onChange={handleChange}
                className="rounded-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700"
                >
                {countries.map(c =>
                    <option value={c} key={c}>{c}</option>
                )}
                </select>
            </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-3">
            <button type="button" className="rounded-full border px-6 py-2 font-semibold shadow text-gray-700 hover:bg-gray-50">
                Close
            </button>
            <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full px-8 py-2 bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-200 transition"
            >
                Submit
            </motion.button>
            </div>
        </form>
    )
  }

  return (
    <div className="w-3/4 mx-auto bg-white shadow-[0px_6px_20px_0px_#31313121] p-6 rounded-4xl space-y-7">

       <h1 className="text-lg font-semibold">Payout Methods</h1>
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-t-xl">
        {/* Date Range - Fake, no logic here */}
        <div className="flex items-center gap-2">
          <button className="flex items-center border border-gray-300 px-3 py-1 rounded text-sm bg-white">
            18/08/25 - 16/09/25 <CalendarDays className="ml-2 w-4 h-4 text-gray-400" />
          </button>
          <button className="px-4 py-1 rounded bg-theme text-white font-semibold text-sm shadow hover:bg-pink-600 transition">
            Filter
          </button>
        </div>
       
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-x-auto border border-gray-100 bg-white mt-2">
        <div className="flex items-center justify-between px-2 py-2 gap-2">
          {/* Per page selector */}
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(+e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {perPageOptions.map((opt) => (
              <option value={opt} key={opt}>{opt}</option>
            ))}
          </select>
          {/* Search box */}
          <div className="mx-2 flex-1 flex items-center justify-end">
            <Search className="absolute mx-3 w-4 h-4 text-gray-400" />
            <input
              className="pl-8 pr-2 rounded-full border border-gray-300 bg-gray-50 py-2 text-sm w-48 sm:w-64 focus:outline-none"
              placeholder="Search"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-[15px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-semibold">
                <th className="py-2 px-3 text-left">Payment Method	</th>
                <th className="py-2 px-3 text-left">Payment Details	</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-400">Loading…</td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-400">No data available in table</td>
                  </tr>
                ) : (
                  rows.map((row,id) => (
                    <motion.tr
                      key={id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.22 }}
                      className="bg-white border-b border-gray-100"
                    >                   
              
                      <td className="py-2 px-3">{row.method}</td>
                      <td className="py-2 px-3">{row.name},{row.details},{row.bank}</td>
                      <td className="py-2 px-3">{row.status}</td>
                      <td className="py-2 px-3 flex gap-2">

                        <span className="bg-gray-100 shadow p-2 rounded-lg text-black hover:bg-red-400 hover:text-white transition-all">
                            <Trash2 className="cursor pointer w-4 h-4"/>
                        </span>
                        <span 
                         onClick={() => {
                            setCurrentRow(row);   
                            setIsOpen(true);
                        }}
                        className="bg-gray-100 shadow p-2 rounded-lg text-black hover:bg-blue-400 hover:text-white transition-all">
                            <FilePenLine  className="cursor pointer w-4 h-4"/>
                        </span>  

                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <PaymentMethodForm  data={currentRow}/>
      </Model>         
      </div>
      
      {/* Footer/pagination */}
      <div className="flex flex-wrap items-center justify-between p-2 text-sm text-gray-700">
        {/* Entry info */}
        <div>
          Showing {(total === 0 ? 0 : (page - 1) * perPage + 1)} to {Math.min(page * perPage, total)} of {total} entries
        </div>
        {/* Pagination */}
        <div className="flex gap-1">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              className={`px-3 py-1 rounded border-2 font-semibold ${
                page === idx + 1
                  ? "bg-theme border-pink-600 text-white"
                  : "bg-white border-transparent text-pink-500"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages || total === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
