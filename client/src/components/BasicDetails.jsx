import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";
import { Group, TextInput, NumberInput, Textarea  } from "@mantine/core";
import SubmitButton from "./SubmitButton";

const BasicDetails = ({ prevStep, propertyDetails, setPropertyDetails, nextStep }) => {
  
  const form = useForm({
    initialValues: {
      title : propertyDetails?.title,
      description: propertyDetails?.description,
      price: propertyDetails?.price,
    },

    validate: {
    // The validateString function is used to make sure the length of the String is greater than 3 when user types in the input field
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) => 
        value < 1000 ? "Price must be greater than $999 dollars" : null,
    },
  });

  // Destruct & Pass the form values to the {propertyDetails} state
  const { title, description, price} = form.values;

  const handleSubmit = ()=> {
    // Validate the form
    const {hasErrors} = form.validate();
    if(!hasErrors) {
        setPropertyDetails((prev)=> ({...prev, title, description, price}))
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
        className="flex flex-col justify-center items-center gap-4 "
      >
        {/* Left */}

        <div className="flex flex-col md:items-center items-start  md:justify-center w-full">
          <TextInput
            style={{ textTransform: "capitalize" }}
            className="w-[100%] md:w-[80%]" 
            withAsterisk
            label="Title"
            placeholder="Property Name"
            //Bind the TextInput component to the 'title' field in the form state
            // The getInputProps function returns an object with properties like value, onChange, and onBlur. When these properties are spread onto the Select
            //.. and TextInput components, they allow the components to display the current field value (value) and update the field value in the form state 
            // .. when the user interacts with the component (onChange).
            // so thats why we DONT NEED to add onChange or setValue MANUALLY as that is all done once when we specify the initial value in the form and then bind the Select Component or the TextInput to the useForm value.
            {...form.getInputProps("title")}
          />

          <Textarea
            style={{ textTransform: "capitalize" }}
            className="w-[100%] md:w-[80%] rows-" 
            placeholder="Description"
            label="Description"
            withAsterisk
            {...form.getInputProps("description")}
            //Bind the TextInput component to the 'city' field in the form state
          />

          <NumberInput
            w={"80%"}
            withAsterisk
            label="price"
            placeholder="1000"
            min={0}
            {...form.getInputProps("price")}
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
             className="bg-[#1C7ED7] font-bold text-sm rounded-md px-6 py-2 text-white"
        >
            Next
        </button>
      </Group>
    </form>
  );
};

export default BasicDetails;