
import { Suspense } from "react";
import Website from "./pages/website"
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import {QueryClient, QueryClientProvider} from 'react-query';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ReactQueryDevtools} from "react-query/devtools"
import { UserDetailsProvider } from "./context/UserDetailsContext";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";


export default function App() {

  const queryClient = new QueryClient();

  return (
    <UserDetailsProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* So basically if we have a large file with alot javascript or if we are fetching data from an Api etc. This could take some time so we use <Suspense> to show loading.. until the page is rendered.</Suspense> */}
          <Suspense fallback={<div>Loading..</div>}>
            <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Website />} />
                <Route path="/properties" >
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        {/* This is a feature that helps you to see Errors/ view cache/ fetching status etc  */}
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </UserDetailsProvider>
  )
}