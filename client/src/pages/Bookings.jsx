import React, { useContext, useState } from 'react';
import PropertyCard from '../components/PropertyCard'; 
import SearchBar from '../components/SearchBar';
import useProperties from '../hooks/useProperties';
import UserDetailsContext from '../context/UserDetailsContext';
import {PuffLoader} from "react-spinners";

const Bookings = () => {
  const {data, isError, isLoading} = useProperties();
  const [filter, setFilter] = useState('')
  const { userDetails : {bookings}} = useContext(UserDetailsContext);
  
  // console.log(bookings)

  if (isLoading) {
    return (
      <div  className='flex w-full justify-center items-center'>
        <div className="flex justify-center w-full items-center">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
        <div className="flex justify-center items-center w-full">
          <p className='font-medium text-red-500 '>Error while fetching the property details</p>
        </div>
    );
  }
  return (
    <div className='flex justify-center w-full border-3 border-green-500'>
      <div className='w-full flex flex-col max-w-[1340px] items-center pt-[100px]'>
        <SearchBar filter={filter} setFilter={setFilter} action/>
        <div className='grid mx-[20px] xs:mx-[80px] smSwipe:mx-[16px] smSwipe:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[60px]'>
        {/*  .map is used to transform all elements in an array and return a new array with the transformed elements. */}
        {/* .The some function returns true if a booking.id is === property.id and then .filter removes any properties that don't satisfy this argument */}
        {data?.filter((property) => bookings?.some((booking) => booking.id === property.id))
            .filter((property) => 
            property.title.toLowerCase().includes(filter.toLowerCase()) ||
            property.city.toLowerCase().includes(filter.toLowerCase()) ||
            property.country.toLowerCase().includes(filter.toLowerCase())
          )
          .map((card) => (
            <PropertyCard card={card} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Bookings;

