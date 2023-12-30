import React from 'react'
import { FaLocationDot } from "react-icons/fa6"
import CustomButton from './CustomButton'
import { useLocation } from 'react-router-dom'


const SearchBar = ({ action, filter, setFilter }) => {

    return (
        <div
        className={`bg-white py-[4px] lg:py-[8px] border-[3px] border-neutral-300 flex items-center justify-center px-[8px]  ${action ? 'rounded-full max-w-[24rem] w-full ' : 'rounded-md space-x-[16px] xs:w-[80%] md:w-[66%] lg:w-[80%]'}`}>
            <FaLocationDot className='text-[#4066ff] text-[24px]' />
            <input 
                value={filter} 
                className='flex-1 outline-none border-none font-poppins h-[20px] text-xs mx-4'
                onChange={(e) => setFilter(e.target.value)}
            />
            <CustomButton action={action}> Search</CustomButton>
        </div>
    )
}

export default SearchBar