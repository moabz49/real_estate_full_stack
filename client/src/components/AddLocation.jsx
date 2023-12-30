import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";
import { Group, Select, TextInput } from "@mantine/core";
import useCountries from "../hooks/useCountries";
import Map from "./Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },

    validate: {
    // This function is used to make sure the length of the String is greater than 3 when user types in the input field
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });
  // Destruct & Pass the form values to the {propertyDetails} state
  const { country, city, address } = form.values;

  const handleSubmit = ()=> {
    // Validate the form
    const {hasErrors} = form.validate();
    if(!hasErrors) {
        setPropertyDetails((prev)=> ({...prev, city, address, country}))
        nextStep()
    }
  }

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
        className="flex md:flex-row flex-col justify-center items-center gap-4 pt-[20px] "
      >
        {/* Left */}

        <div className="flex flex-col justify-around w-full h-[40vh]">
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            // We pass the getAll() function which contains a list of al the countries name formatted.
            data={getAll()}
            //Bind the Select component to the 'country' field in the form state
            // The getInputProps function returns an object with properties like value, onChange, and onBlur. When these properties are spread onto the Select
            //.. and TextInput components, they allow the components to display the current field value (value) and update the field value in the form state 
            // .. when the user interacts with the component (onChange).
            // so thats why we DONT NEED to add onChange or setValue MANUALLY as that is all done once when we specify the initial value in the form and then bind the Select Component or the TextInput to the useForm value.
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            style={{ textTransform: "capitalize" }}
            w={"100%"}
            withAsterisk
            label="City"
            //Bind the TextInput component to the 'city' field in the form state
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            style={{ textTransform: "capitalize" }}
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>
        {/* right side */}
        <div className="h-[40vh] w-full mt-[20px]">
            <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
       {/* "Next" button in this form, it will trigger the handleSubmit function, */}
        <button
            type="submit"
             className="bg-[#1C7ED7] font-bold text-sm rounded-md px-6 py-2 text-white"
        >
            Next
        </button>
      </Group>
    </form>
  );
};

export default AddLocation;