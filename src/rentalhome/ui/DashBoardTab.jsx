import React from 'react'

function DashBoardTab({menuItems,menu,handleMenuItem}) {
  return (
     <div className="bg-white shadow-[0px_6px_25px_0px_#31313121] py-5 rounded-4xl">
                    <ul className="space-y-4 px-6">
                    {menuItems.map((item,id)=>(
                       <li key={id}>
                            <button
                                onClick={() => handleMenuItem(item)}
                                className={`w-full text-left text-md font-semibold rounded-full px-4 py-3 cursor-pointer 
                                transition-all duration-300 ease-in-out 
                                ${menu === item ? "bg-theme text-white" : "hover:bg-gray-200"}
                                `}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                    </ul>
                </div>
  )
}

export default DashBoardTab