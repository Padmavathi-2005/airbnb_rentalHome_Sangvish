import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Search, Trash2 ,Wallet,FilePenLine} from "lucide-react";
import balanceBg from '../../../../assets/images/balance-bg.png'

// Dummy API function
function fetchPayouts({ page, perPage, search }) {
  // Fake API response (simulate network with Promise)
  const all = [
    {
    id:100,
    name:"Entire home/apt in Lanzhou",
    type:"booking",
    method: "wallet",
    amount:76,
    cohost:'',
    date:"12/03/2025",
    },
    {
    id:101,
    name:"Entire home/apt in Lanzhou",
    type:"booking",
    method: "wallet",
    amount:76,
    cohost:'',
    date:"12/03/2025",
    },   
    
    // ...more rows...
  ].filter(
    (row) =>
      !search || row.name.includes(search)
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

export default function Transactions() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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

  return (
   
        <div className="bg-white mb-5 shadow-[0px_6px_20px_0px_#31313121] p-6 rounded-4xl space-y-7">

        <h1 className="text-lg font-semibold">Transaction History</h1>
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
                    <th className="py-2 px-3 text-left">ID</th>
                    <th className="py-2 px-3 text-left">Name</th>
                    <th className="py-2 px-3 text-left">Type</th>
                    <th className="py-2 px-3 text-left">Payment Method</th>
                    <th className="py-2 px-3 text-left">Amount</th>
                    <th className="py-2 px-3 text-left">cohost</th>
                    <th className="py-2 px-3 text-left">Date</th>
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
                        <td className="py-2 px-3">{row.id}</td>
                        <td className="py-2 px-3">{row.name}</td>
                        <td className="py-2 px-3">{row.type}</td>
                        <td className="py-2 px-3">{row.method}</td>
                        <td className="py-2 px-3">{row.amount}</td>
                        <td className="py-2 px-3">{row.cohost}</td>
                        <td className="py-2 px-3">{row.date}</td>
                        
                        </motion.tr>
                    ))
                    )}
                </AnimatePresence>
                </tbody>
            </table>
            </div>
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
