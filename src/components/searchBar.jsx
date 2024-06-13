import React , {useState} from 'react'
import {fetchData} from "../actions/index.jsx";
import {useDispatch} from "react-redux";

const SearchBar = () => {

    const [location , setLocation]=useState("")
    const dispatch=useDispatch()


    const searchLocation = (event)=>{
        if (event.key === 'Enter'){
            dispatch(fetchData(location));
            setLocation("")
        }
    }

    return (

        <div className=' max-w-[1640px] mx-auto pb-20'>
            <div className='flex items-center justify-center mx-auto px-2 pt-20'>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    placeholder="Enter The City Name"
                    type="text"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                    onKeyPress={searchLocation}
                  />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="w-4 h-4 opacity-70">
                    <path fill-rule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clip-rule="evenodd"/>
                </svg>
            </label>

        </div>
        </div>
    )
}
export default SearchBar
