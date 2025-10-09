import React, { useState } from 'react'
import { setTest } from '../../../slices/TestSlice';
import { useDispatch } from 'react-redux';
// import SinglePageTest from '../../pages/singlePageTest';
import { useNavigate } from 'react-router-dom';

function SearchBarRedux() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const addTest =()=>{
        if(input){
            dispatch(setTest(input))
            setInput('')
            navigate('./testSinglePage')

        }
    }
    console.log("redux is ", input)

  return (
    <div>
        <h1>Add Customer</h1>
        <input value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={addTest}>add</button>
        
    </div>
    
  )
}

export default SearchBarRedux