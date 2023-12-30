import React from 'react'
import { AiFillHeart} from "react-icons/ai";
import { AiOutlineHeart } from 'react-icons/ai';
import { useContext, useEffect, useState }  from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../context/UserDetailsContext';
import { checkFavourites, updateFavourites } from '../utils/common';
import { toFav } from '../utils/api';


const Heart = ({ id }) => {
    const [heartColor, setHeartColor] = useState("white");
    const { validateLogin } = useAuthCheck();
    const { user } = useAuth0();

    const {
        userDetails: { favourites, token },
        setUserDetails,
    } = useContext(UserDetailsContext);

    // When a user is Authenticated the hooks in Layout.jsx fetches the properties
    // .. that are in the Favourites [] from the backend and then sets them to "userDetailsContext" state favourites Array[] .
    // When that happens it will trigger the UseEffect to setHeartColor for all the properties that are in userDetails favourites Array[].
    useEffect(() => {
        // Set the COLOR of the HEART for the properties in favourites Array[].
        setHeartColor(() => checkFavourites(id, favourites))
    },[favourites]);

    const {mutate} = useMutation({
        mutationFn: () => toFav(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => (
                {
                    ...prev,
                    // Removes or Adds property to Favourites Array.
                    favourites: updateFavourites(id, prev.favourites)
                }
            ))
        }
    })

    const handleLike = () => {
        // Only is User is Logged in can they like || unlike.
        if(validateLogin()) 
        {
            // Call mutate
            mutate()
            // Change the COlOR of the Heart
            setHeartColor((prev) => prev  === "#fa3e5f" ? "white": "fa3e5f" )
        }
    }
    return (
        <>
        {heartColor === "#fa3e5f" ? (
            <AiFillHeart
                size={32}
                color={heartColor}
                className={`absolute top-6 right-6 `}
                onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                }}
            />
        ) : (
            <AiOutlineHeart
                size={32}
                color={heartColor}
                className={`absolute top-6 right-6`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                }}
            />
        )}
    </>
    )
}

export default Heart