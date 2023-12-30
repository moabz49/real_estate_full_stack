import React from 'react'

const CustomButton = ({ children, action, actionType, loginWithRedirect, validateLogin, setModalOpened }) => {

    const handleClick = () => {
        if (actionType === 'login') {
            loginWithRedirect();
        } else if (actionType === 'validate') {
            validateLogin() &&
            setModalOpened(true)
        }
    }

    return (
      <button onClick={handleClick} className={`capitalize primaryBlue py-2 px-6 text-white hover:scale-[107%] duration-300 ease-out focus:scale-[95%] focus:opacity-80 transition-transform text-sm font-medium  ${action ? 'rounded-full' : 'rounded-md '}`}>
        {children}
      </button>

    )
}

export default CustomButton;