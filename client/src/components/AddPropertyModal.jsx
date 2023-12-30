import React, { useState } from 'react'
import { Container, Modal, Stepper } from "@mantine/core";
import AddLocation from './AddLocation.jsx'
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from "./UploadImage.jsx";
import Facilities from './Facilities.jsx';
import BasicDetails from './BasicDetails.jsx';


const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive]  = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: 0,
    country: '',
    city: '',
    address: '',
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  const nextStep = ( ) => {
    setActive((currentStep) => (currentStep < 4 ? currentStep + 1 : currentStep));
  }

  const prevStep = ( ) => {
    setActive((currentStep) => (currentStep > 0 ? currentStep - 1 : currentStep));
  }

  return (
    <Modal
      size={"90rem"}
      className="pb-4"
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          w={"100%"}
          h={"100%"}
          // Every Step CLICKED triggers the setActive. This is how we track the active step.
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelectable={false}
          >
          <Stepper.Step label="Location" description="Address"> 
            <AddLocation 
              nextStep={nextStep}
              propertyDetails={propertyDetails} 
              setPropertyDetails={setPropertyDetails}
              />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload"> 
            <UploadImage
              prevStep={prevStep} 
              nextStep={nextStep}
              propertyDetails={propertyDetails} 
              setPropertyDetails={setPropertyDetails}
              />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details"> 
            <BasicDetails 
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails} 
              setPropertyDetails={setPropertyDetails}
              />
          </Stepper.Step>
          <Stepper.Step > 
            <Facilities 
              prevStep={prevStep}
              propertyDetails={propertyDetails} 
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
              />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to go back to previous step
          </Stepper.Completed>

        </Stepper>
      </Container>
      </Modal>
)
}

export default AddPropertyModal