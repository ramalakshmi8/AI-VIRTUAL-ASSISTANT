import React, { useRef, useState } from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { BiImageAdd } from "react-icons/bi";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Customize = () => {
  // const [frontendImage, setFrontendImage] = useState(null);
  // const [backendImage, setBackendImage] = useState(null);
  const inputImage = useRef();
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
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
    setSelectedImage("input");
  };
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex items-center justify-center flex-col">
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]"
        onClick={() => navigate("/")}
      />
      <h1 className="text-white text-[30px] mb-[20px] text-center">
        Select your <span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[60%] flex items-center justify-center flex-wrap gap-[15px] ">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] 
            rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center
            border-4 transition-all duration-200
            ${
              selectedImage === "input"
                ? "border-white shadow-2xl shadow-blue-950"
                : "border-[#030353] hover:border-white hover:shadow-2xl hover:shadow-blue-950"
            }`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage ? (
            <BiImageAdd className="w-[25px] h-[25px] text-white" />
          ) : (
            <img
              src={frontendImage}
              alt="Selected Image"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage && (
        <button
          onClick={() => navigate("/customize2")}
          className="min-w-[150px] h-[60px] mt-5 bg-white text-black font-semibold rounded-full text-[18px]"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
