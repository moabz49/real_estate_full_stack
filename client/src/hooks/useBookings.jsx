import React, { useEffect, useRef, useContext } from 'react';
import UserDetailsContext from "../context/UserDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";


const useBookings = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const queryRef = useRef();
    const { user } = useAuth0();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: "allBookings",
        queryFn: () => getAllBookings(user?.email, userDetails?.token),
        onSuccess: (data) => 
             setUserDetails((prev) => ({ ...prev, bookings: data})),
        // enabled option controls whether the query begins and attempts to fetch when it is mounted. So this function will NOT run if there is !User
        enabled: user !== undefined,
        // The staleTime options is used to check whether to use "cached Data" OR Fetch "fresh data".
        // 3000 means that the fetched data will be considered fresh for 3 seconds after the 3 seconds the new data will be fetched.
        // If the same Query is run again within this 3 second-period then that will be fetched from the cache. 
        // But again after the 3 seconds period, the data becomes "stale" and a new fetch is triggered.
        // This allows for smoother User Experinece as the UI doesn't have to wait for data to fetched everytime the query is ran.
        staleTime: 3000,
    })

    // refetch is a function that is used to manually trigger a refetch of the data regardless of whether the data is "stale" or "not".
    // We store the refetch in a {ref} so that we can pass to the UseEffect where the refetch is triggered whenever the userDetails?.token chnages.
    // The reason we store the refetch in a ref is because it can change between renders, So by storing it in a ref we ensure that the latest DATA is fetched.
    queryRef.current = refetch;

    useEffect(() => {

        queryRef.current && queryRef.current();
    }, [userDetails?.token]);

    return { data, isError, isLoading, refetch}
}

export default useBookings