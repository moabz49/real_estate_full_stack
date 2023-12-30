import React from 'react'

const SubmitButton = ({children, actionType, prevStep, mutate, disabledBooking, nextStep, handleNextStepTwo}) => {

    const handleClick = () => {
        if (actionType === 'bookings') {
            mutate();
        } else if (actionType === 'next') {
            nextStep();
        } else if (actionType === 'prev') {
            prevStep();
        } else if (actionType === 'nextStepTwo') {
            handleNextStepTwo();
        }
    }

    return (
        <button type="submit" onClick={handleClick} disabled={disabledBooking} className="bg-[#1C7ED7] font-bold text-sm rounded-md px-6 py-2 text-white">
            {children}
        </button>



    )
}

export default SubmitButton;