import React, { useEffect, useContext } from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUser } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../context/UserDetailsContext';
import useBookings from '../hooks/useBookings';
import useFavourites from '../hooks/useFavourites';

const Layout = () => {
  // When suer Logins we use these useQuery hooks to fetch all the Bookings & Favourites.
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup, getAccessTokenSilently} = useAuth0();
  const { setUserDetails } = useContext(UserDetailsContext);

  // mutate is the function that is used to call teh mutation it receives the token as (res) in the useEffect.
  // mutationKey 
  const { mutate } = useMutation({ 
    // mutationKey again should be sued for caching purposes etc although we are simply using as a key because of best practice.
    // This is because it does not make sense to refetch a token as tokens should be persistent.
    mutationKey: [user?.email],
    // mutationFn is just a generic name for the function when we call mutate(res) the (res) is the (token)
    mutationFn: (token) => createUser(user?.email, token),
  });
  
  useEffect(() => {
    // console.log('useEffect is running');
    const getTokenAndRegister = async () => {
        const token = await getAccessTokenSilently({
          audience: "http://localhost:8000",
          scope: "openid profile email",
        });
        // console.log('Token:', token);
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token: token }));
        mutate(token)
    };
      // Only is if user is Authenticated via Auth0 then we will get the token and set it in the localStorage and Context && on Failure then do nothing.
      isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated])

  return (
    <>
        <Header />
            {/* Outlet is used by React-router-dom So as Website.jsx is {wrappped} within <Layout> in the App.js file we can use Outlet to Show the Website.jsx as well as other Components. */}
            <Outlet />
        <Footer />

    </>
  )
}

export default Layout