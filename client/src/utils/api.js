import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// React Query
// The React Query cache is an in-memory cache that stores the results of your queries. Each query has a unique key, and the cache uses this key to store and retrieve the data for that query. The cache also stores metadata about each query, 
// like whether it's currently loading, when it was last updated, and whether it encountered any errors. The cache is not directly accessible, but you can interact with it using the methods provided by React Query, like useQuery, useMutation, invalidateQueries, etc.

// 1. Caching is the same Query is run again then React Query will return cached data rather than fetching from the server again.
// 2. Refetching if a the query key is called then automatically React Query will fetch that data.
// 3. Invalidation BASICALLY it means make a request to the backend again rather than fetching data from the cache because we have made a CRUD operation. 
// .. So everytime you make a that request using useQuery. It knows to fetch from the server rather from its cache. This will help in ensuring that CRUD operations are rendered correctly.
// .. Example 
// const mutation = useMutation(newTodo => axios.post('/todos', newTodo), {
//   // After the mutation, invalidate the 'todos' query
//   onSuccess: () => {
//     queryClient.invalidateQueries('todos') ## After the mutation, invalidate the 'todos' query so fetch from the backend as we have performed a CRUD operation.
//   },
// })
// 4. Parallel & Dependent Queries are queries that can be run at the same time. Example: If we have a page that displays a list of todos and a list of users, we can run both of these queries in parallel.
export const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", {
        // timeout is a feature of axios it is used in axios requests to set a timeout before a request should be aborted. 
        // So because we are using axios we can use the timeout. If a request takes longer than 10 seconds, because of a slow server etc 
        // ... then axios will abort the request.
            timeout: 10 * 1000
        })

        if (response.status === 400 || response.status === 500 ) {
        // throw an Error is used so we can get deatils about the Error that has occured. 
        // The reason we throw the response.data is because we get more details about the error than we would by just doing throw error.
            throw response.data;
        }
        return response.data;
    } catch (err) {
        toast.error("Something went wrong")
        throw err;
    }
}

export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
        // if request takes longer than 10 seconds, axios will abort the request.
            timeout: 10 * 1000
    });
    
    if (response.status === 400 || response.status === 500) {
        // We throw response.data because we can get more details about teh specific ERROR.
        throw response.data;
    }
    // success
    return response.data;
    } catch (err) {
        toast.error("Something went wrong")
        throw err;
    }
}

export const createUser = async (email, token) => {
    try {
        await api.post(
            `/user/register`,
            { email },
            // We have to pass the Token in headers as our middleware in the backend requires a valid JWT in the AUTHORIZATION HEADER before creating a User in the database.
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
    } catch (err) {
        toast.error("Something went wrong, Please try again");
        throw err;
    }


}

export const bookVisit = async (date, propertyId, token, email) => {
    try {
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            date: dayjs(date).format("DD/MM/YYYY")
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    } catch (err) {
        toast.error("Something went wrong")
        throw err;
    }
}

export const removeBooking = async (propertyId, token, email) => {
    try {
        await api.post(`/user/removeBooking/${propertyId}`, {
            email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    } catch (err) {
        toast.error("Something went wrong")
        throw err;
    }
}

export const getAllBookings = async (email, token)  => {
    if(!token) return 
    try {
        const res = await api.post(
            `/user/allBookings`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return res.data["bookedVisits"];
    } catch(err) {
        toast.error("Something went wrong while fetching bookings");
        throw err;
    }
}


export const toFav = async (propertyId, email, token) => {
    try {
        await api.post(`/user/toFav/${propertyId}`, {
            email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
    } catch (err) {
        toast.error("Something went wrong")
        throw err;
    }
}


export const getAllFav = async (email, token)  => {
    if(!token) return 
    try {
        const res = await api.post(
            `/user/allFav`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        // res.data["favResidenciesID"] is the same as writing res.data.favResidenciesID
        return res.data["favResidenciesID"];
    } catch(err) {
        toast.error("Something went wrong while fetching bookings");
        throw err;
    }
};

export const createResidency = async (data, token) => {
    console.log(token);
    console.log(data)
    try{
      const res = await api.post(
        `/residency/create`,
        {
          data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    //  We don't need to return anything we will refetch allProperties once CreateResidency is Successful.
    }catch(error)
    {
      throw error
    }
  }