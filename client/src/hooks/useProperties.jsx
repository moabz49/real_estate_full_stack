import React from 'react'
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

// Why we are using React Query?
// React Query automatically CACHES your data and ensures that the same data isn't fetched multiple times if it's already available. This can significantly improve the performance of your application.
// Automatic refetching: React Query can automatically refetch data when certain events occur, like when the window regains focus. This ensures that your data is always up-to-date.
// Error and loading states: React Query provides isLoading and isError states out of the box, which makes it easier to handle loading and error states in your UI.


const useProperties = () => {

  const { data, isLoading, isError, refetch } = useQuery(
    // queryKey: "allProperties"
    // refetchOnWindowFocus --> whenever a user leaves the tab or window and comes back, the data will be refetchd so its uptodate. This would be essentail for Trading Apps or crypto Apps but because we have a property App we don't really need this.
    "allProperties", getAllProperties, {refetchOnWindowFocus: false}
  )

  return {
    data,
    isError,
    isLoading,
    refetch
  }
}

export default useProperties;