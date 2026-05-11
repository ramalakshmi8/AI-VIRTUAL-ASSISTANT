import React from "react";
import { useUser } from "../context/UserContext";

const Card = ({ image }) => {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useUser();
  return (
    <div
      className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-4 border-[#030353] rounded-2xl overflow-hidden
    hover:shadow-2xl hover:shadow-blue-950 cursor-pointer  hover:border-white ${selectedImage === image ? "border-4 shadow-2xl shadow-blue-950 border-white" : null}`}
      onClick={() => {
        setSelectedImage(image);
        setFrontendImage(image);
        setBackendImage(null);
      }}
    >
      <img
        src={image}
        alt="Card Image"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
};

export default Card;
