import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Group } from "@mantine/core";
import SubmitButton from "./SubmitButton";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  
  const handleNextStepTwo = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        // Configuration for uploading images to Cloudinary also we added a <script> tag in the index.html 
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
            // ImageURL state is then used to update the propertyDetails Image state.
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-[2rem] mt-[3rem] w-full">
      {!imageURL ? (
        <div
          className="flex flex-col items-center justify-center w-[90%] h-[25rem] border-[1px] border-dashed border-gray-400 cursor-pointer "
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="rounded-[10px] overflow-hidden cursor-pointer"
        // We are opening the Cloudinary widget    
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <SubmitButton actionType="prev" prevStep={prevStep}>
          Back
        </SubmitButton>
        <SubmitButton actionType="nextStepTwo" handleNextStepTwo={handleNextStepTwo} disabled={!imageURL}>
          Next
        </SubmitButton>
      </Group>
    </div>
  );
};

export default UploadImage;