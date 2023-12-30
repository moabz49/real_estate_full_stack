import React, { useState, useContext } from 'react'
import { Modal, Button} from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';
import UserDetailsContext from '../context/UserDetailsContext';
import { bookVisit } from "../utils/api";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import SubmitButton from './SubmitButton';

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  
  const [ value, setValue ] = useState(null); 
  const { 
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext)

  const handleBookingSuccess = () => {
    toast.success("You have successfully booked a visit!", {
      position: "bottom-right"
    })
    // Map through the UserContext and then add a new Booking which includes the PropertyId and the date of the booking.
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId, date: dayjs(value).format('DD/MM/YYYY'),
        }
      ]
    }))
  };


  
  const {mutate, isLoading} = useMutation({
    mutationFn: () => bookVisit(value, propertyId, token, email),
    onSuccess: () => handleBookingSuccess(),
    onError: ({response}) => toast.error(response.data.message),
    // onSettled: This function is called after the mutation either succeeds or encounters an error. 
    // It our case its closing the Modal regardless of success or failure.
    onSettled: () => setOpened(false)
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered 
      title="Select a day to visit"
    >
      <div className='flex flex-col items-center space-y-4'>
        <DatePicker allowDeselect date={value} onChange={setValue} minDate={new Date()} defaultDate={new Date()} />
        <SubmitButton 
          actionType="bookings"
          mutate={mutate}
          disabledBooking={!value || isLoading}

          >
           Book a Visit  
        </SubmitButton>
      </div>

    </Modal>
  )
}

export default BookingModal