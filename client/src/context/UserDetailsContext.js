import React, { createContext, useState } from 'react';


const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children}) => {
    const [userDetails, setUserDetails] = useState({
        favourites: [],
        bookings: [],
        token: null,
    });

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );
}
export default UserDetailsContext;