import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Image as LucideImage } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import {addProperty} from "../../../../slices/AddPropertySlice"

export default function Photos({setNav}) {
  const dispatch = useDispatch();  
  const propertyStore = useSelector(state => state.addProperty);
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState([])
  const inputRef = useRef();

function handleFiles(files) {
  const filesArray = Array.from(files).map((file) => ({
    // Remove 'file' property!
    url: URL.createObjectURL(file),
  }));
  setImages(filesArray);
}





    console.log("images new array for Redux: ", propertyStore);


  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover");
  }
  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
      handleFiles(e.dataTransfer.files)
    }
    // handle files: e.dataTransfer.files
  }
  function handleBrowse() {
    inputRef.current.click();
  }

    const [ytLink, setYtLink] = useState("");

  function handleUpload(e) {
    e.preventDefault();
    // handle youtube link upload logic
  }

  useEffect(() => {
  const imagesForRedux = images.map(img => ({
    url: img.url,
    name: img.file?.name || '',
    size: img.file?.size || 0,
    type: img.file?.type || '',
  }));
  dispatch(addProperty({...propertyStore, images: imagesForRedux}));
  console.log("images new array for Redux: ", imagesForRedux);
}, [images]);

 

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5 flex flex-col md:flex-row md:items-center gap-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:w-1/2 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-sm "
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Listing preview"
          className="object-cover h-[680px] rounded-2xl"
        />
      </motion.div>

        <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8  w-1/2 mx-auto my-6 shadow"
        >
        <div className="font-bold text-lg mb-4 text-gray-900">Upload Photos</div>
        <form
          className={`w-full min-h-[240px] flex flex-col items-center justify-center border-2 ${dragActive ? "border-pink-500 bg-pink-50" : "border-dashed border-gray-300 bg-gray-50"} rounded-xl transition`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowse}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e=>{
              if(e.target.files)handleFiles(e.target.files)
            }}
          />
          <LucideImage className="text-gray-400 w-16 h-16 mb-3" />

       <button
            type="button"
            tabIndex={-1}
            className="rounded bg-white hover:bg-theme-20 border border-  pink-200 px-5 py-1 font-semibold text-pink-500 shadow-sm text-sm mb-1"
          >
            Choose Files
          </button> 
          <span className="font-medium text-gray-700 mt-2 mb-1 text-center">
            Drag &amp; drop photos here or click to browse
          </span>
          <span className="block text-sm text-gray-400 mb-4 text-center">
            (Minimum Width 1000px and Height 1200px)
          </span>
         
        </form>
        <div className="flex flex-wrap gap-3 my-4">
          {images.map((img,id)=>(
          <img 
          key={id}
          src={img.url} alt={`image preview ${id}`}
          className="w-24 h-24 object-cover rounded-lg" />
          ))}
        </div>
         <div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-xl mx-auto my-6 shadow"
          >
            <div className="font-bold text-lg mb-5 text-gray-900">Upload Videos</div>
            <form
              className="flex flex-col md:flex-row items-center gap-4"
              onSubmit={handleUpload}
            >
              <input
                type="url"
                required
                placeholder="Enter youtube link here"
                value={ytLink}
                onChange={e => setYtLink(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition w-full"
              />
            
            </form>
          </div>
           <div className="flex justify-between gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="border border-gray-400 px-6 py-2 rounded-full bg-white font-semibold transition"
            type="button"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-2 rounded-full bg-theme text-white font-semibold shadow-md focus:ring-2 focus:ring-pink-200 transition"
            type="submit"
            onClick={(e) => {
            e.preventDefault();  // your existing function
            setNav("Amenities");  // set state to show next component
            }}

          >
            Next
          </motion.button>
        </div>

        </motion.div>

    </div>
  );
}
