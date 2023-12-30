import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CustomButton from '../components/CustomButton';
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { toast } from "react-toastify";
import Map from "../components/Map";
import { getProperty, removeBooking } from "../utils/api"
import { useQuery, useMutation } from 'react-query';
import useAuthCheck from '../hooks/useAuthCheck';
import UserDetailsContext from '../context/UserDetailsContext';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../components/BookingModal';
import { Button } from '@mantine/core';
import Heart from "../components/Heart";
import { PuffLoader } from "react-spinners";

const Property = () => {
  const { propertyId } = useParams();
  // ["resd", propertyId]: This is the unique key for this query. React Query uses this key as an identifier to manage the query in its cache. 
  // When propertyId changes, React Query will automatically refetch the data.
  const { data, isLoading, isError } = useQuery(["resd", propertyId], () => getProperty(propertyId))
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const { 
    userDetails: { token, bookings } ,
    setUserDetails,
  } = useContext(UserDetailsContext)
  // console.log(bookings)

 // The cancelling variable is coming from the useMutation hook. It is a boolean that is true when the mutation is in progress and false otherwise.
 // isLoading is a boolean that is used to  display a component like .. <div>Loading...</div>. We pass this to the Cancel Button below on {disabled} in the form of cancelling.
 // so when a user decides to "cancel" there booking the disable button will trigger the boolean "isLoading " to display the <div> Loading... </div>
// also instead of calling mutate() we call cancelBooking() --> just rename. Same for isLoading && cancelling.
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(propertyId, token, user?.email,),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== propertyId),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    }
   })


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
    <div className="pt-[80px] flex w-full items-center justify-center">
      <div className='flex w-full max-w-[1340px] flex-col justify-center xs:m-[40px] m-[20px] '>
        <div className='relative'>
          <Heart id={propertyId}/>
          {/* object-cover makes the images resized to fit its parent while keeping aspect ratio but parts of the image may be cut off to keep the Quality.*/}
          <img src={data.image} alt={data.title} className='flex w-full rounded-2xl max-h-[600px] mb-[40px] object-fit' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* LeftSide */}
          <div className='flex flex-col space-y-8'>
            <div className='flex justify-between font-roboto'>
              <h1 className='secondaryText text-3xl xs:text-4xl'>{data.title}</h1>
              <h2 className='primaryText text-[1.5rem] xs:text-[1.8rem] flex items-center'>$&nbsp;{data.price}&nbsp;<span className='text-base text-[#1f3e72] '>p/n</span></h2>
            </div>
            <div className='flex flex-col sm:flex-row justify-between text-[#1f3e72] font-medium space-y-4 sm:space-y-0 '>
              <div className='flex items-center space-x-2'><FaShower  size={28}/><span>{data.facilities.bathrooms} Bathrooms</span></div>
              <div className='flex items-center space-x-2'><AiTwotoneCar size={28} /><span>Parking</span></div>
              <div className='flex items-center space-x-2'><MdMeetingRoom size={28}/><span>{data.facilities.bedrooms} Bedrooms/s</span></div>

            </div>
            <div className='text-neutral-400 text-sm xs:text-base'>
              {data.description}
            </div>
            <div className='text-neutral-400 flex items-center space-x-4'> 
              <MdLocationPin className="text-[#1f3e72]" size={28} /> 
              <span>
                {data.address},{' '}
                {data.city},{' '}
                {data.country}
              </span> 
            </div>
            {bookings?.map((booking) => booking.id).includes(propertyId) ? (
                <>
                <Button variant="outline" color="red" onClick={() => cancelBooking()} disabled={cancelling}>Cancel booking</Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === propertyId)[0].date}
                </span>
                </>
            ): (
              <CustomButton actionType="validate" validateLogin={validateLogin} setModalOpened={setModalOpened}>Book your visit</CustomButton>
              )}
            <BookingModal 
            opened={modalOpened}
            setOpened={setModalOpened}
              propertyId={propertyId}
              email={user?.email}
          
            />
          </div>
          {/* Right side */}
          <div className='w-full h-[60vh]'>
            <Map
              address={data.address}
              city={data.city}
              country={data.country}
            />
          </div>
        </div>
      </div>
    
    </div>

  )
}

export default Property