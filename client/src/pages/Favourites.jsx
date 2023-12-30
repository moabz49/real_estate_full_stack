import React, { useContext, useState } from 'react';
import PropertyCard from '../components/PropertyCard'; 
import SearchBar from '../components/SearchBar';
import useProperties from '../hooks/useProperties';
import UserDetailsContext from '../context/UserDetailsContext';
import {PuffLoader} from "react-spinners";

const Favourites = () => {
  const {data, isError, isLoading} = useProperties();
  const [filter, setFilter] = useState('')
  const { userDetails : {favourites}} = useContext(UserDetailsContext);

  // console.log(favourites);

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
        {/* fav is the id whereas bookings consits of the Id and the date  */}
        {data?.filter((property) => favourites?.some((fav) => fav === property.id))
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

export default Favourites;

