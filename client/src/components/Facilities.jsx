import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import { Group,  NumberInput } from "@mantine/core";
import SubmitButton from "./SubmitButton";
import UserDetailsContext from "../context/UserDetailsContext";
import { useMutation } from "react-query";
import useProperties from "../hooks/useProperties";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { createResidency } from "../utils/api";



const Facilities = ({ prevStep, propertyDetails, setPropertyDetails, setActiveStep, setOpened }) => {

  const form = useForm({
    initialValues: {
      bedrooms : propertyDetails?.facilities.bedrooms,
      parkings: propertyDetails?.facilities.parkings,
      bathrooms: propertyDetails?.facilities.bathrooms,
    },
    
    validate: {
      // This function is used to make sure the length of the String is greater than 3 when user types in the input field
      bedrooms: (value) => value < 1 ? "Must have atleast one room" : null,
      bathrooms: (value) => 
      value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  // Destruct & Pass the form values to the {propertyDetails} state
  const { bedrooms, parkings, bathrooms} = form.values;

  const handleSubmit = ()=> {
    // Validate the form
    const {hasErrors} = form.validate();
    if(!hasErrors) {
      setPropertyDetails((prev)=> ({...prev, facilities: { bedrooms, parkings, bathrooms },
      }))
      mutate();
    }
  }

  // Upload Logic for new property
  console.log(propertyDetails)

  const { user }  = useAuth0();
  const  {
    userDetails: { token },
  } = useContext(UserDetailsContext);
  // We use the refetch property from useQuery to fetch all the Properties using useProperties hook.
  const { refetch: refetchProperties } = useProperties();
  
  const {mutate, isLoading } = useMutation({
    mutationFn: () => createResidency({
      ...propertyDetails, facilities: { bedrooms, parkings, bathrooms },
      userEmail: user?.email,
    }, token),
    onError: ({ response }) => toast.error(response.data.message, {position: "bottom-right"}),
    // Regardless of whether Sucesss or Error
    onSettled: () => {
      toast.success("Added Successfully", {position: "bottom-right"});
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      })
      setOpened(false)
      setActiveStep(0)
      // Calling the refetch property form useQuery to fetch all the Properties using useProperties hook.
      refetchProperties()
    }

  })

  return (
    <form
        className="pb-4"
        // We call handleSubmit() when the form is submitted.
        onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit()
        }}
    >
      <div
        className="flex flex-col justify-center items-center gap-4 "
      >
        {/* Left */}

        <div className="flex flex-col md:items-center items-start  md:justify-center w-full">
          <NumberInput
            className="w-[100%] md:w-[80%]" 
            withAsterisk
            label="No of Bedrooms"
            {...form.getInputProps("bedrooms")}
          />

          <NumberInput
            className="w-[100%] md:w-[80%]" 
            withAsterisk
            label="No of Parkings"
            {...form.getInputProps("parkings")}
            //Bind the TextInput component to the 'parkings' field in the form state
          />

          <NumberInput
            w={"80%"}
            withAsterisk
            label="No of Bathrooms"
            min={0}
            {...form.getInputProps("bathrooms")}
          />
        </div>

      </div>

      <Group position="center" mt={"xl"}>
       {/* "Next" button in this form, it will trigger the handleSubmit function, */}
        <SubmitButton actionType="prev" prevStep={prevStep}>
            Back
          </SubmitButton>
        <button
            type="submit"
             className="bg-[#36B24D] font-bold text-sm rounded-md px-6 py-2 text-white"
        >
            Add Property
        </button>
      </Group>
    </form>
  );
};

export default Facilities;