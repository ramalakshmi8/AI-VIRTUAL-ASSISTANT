import React, { useRef } from "react";
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
  const inputImage = useRef();

  const {
    frontendImage,
    setFrontendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useUser();

  const navigate = useNavigate();

  // ---------------- PREDEFINED IMAGES ----------------
  const images = [image1, image2, image3, image4, image5, image6, image7];

  // ---------------- HANDLE LOCAL IMAGE ----------------
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // file for backend upload
    setBackendImage(file);

    // image preview
    setFrontendImage(URL.createObjectURL(file));

    // selected card
    setSelectedImage("input");

    console.log("Local image selected:", file);
  };

  // ---------------- HANDLE PREDEFINED IMAGE ----------------
  const handlePredefinedImage = (img) => {
    // no backend file
    setBackendImage(null);

    // direct image path
    setFrontendImage(img);

    // selected card
    setSelectedImage(img);

    console.log("Predefined image selected:", img);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col px-[20px] py-[40px]">
      {/* BACK BUTTON */}
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]"
        onClick={() => navigate("/")}
      />

      {/* TITLE */}
      <h1 className="text-white text-[30px] mb-[30px] text-center font-semibold">
        Select your <span className="text-blue-200">Assistant Image</span>
      </h1>

      {/* IMAGE GRID */}
      <div className="w-full max-w-[1000px] flex items-center justify-center flex-wrap gap-[15px]">
        {/* PREDEFINED IMAGES */}
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => handlePredefinedImage(img)}
            className={`w-[80px] h-[140px] lg:w-[160px] lg:h-[260px]
            rounded-2xl overflow-hidden cursor-pointer border-4 transition-all duration-300
            ${
              selectedImage === img
                ? "border-white shadow-2xl shadow-blue-900 scale-105"
                : "border-[#030353] hover:border-white hover:shadow-2xl hover:shadow-blue-900"
            }`}
          >
            <img
              src={img}
              alt="assistant"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* CUSTOM IMAGE */}
        <div
          onClick={() => inputImage.current.click()}
          className={`w-[80px] h-[140px] lg:w-[160px] lg:h-[260px]
          bg-[#030326]
          rounded-2xl
          overflow-hidden
          cursor-pointer
          flex items-center justify-center
          border-4
          transition-all duration-300
          ${
            selectedImage === "input"
              ? "border-white shadow-2xl shadow-blue-900 scale-105"
              : "border-[#030353] hover:border-white hover:shadow-2xl hover:shadow-blue-900"
          }`}
        >
          {!frontendImage || selectedImage !== "input" ? (
            <BiImageAdd className="w-[30px] h-[30px] text-white" />
          ) : (
            <img
              src={frontendImage}
              alt="selected"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* HIDDEN FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputImage}
          onChange={handleImage}
        />
      </div>

      {/* NEXT BUTTON */}
      {selectedImage && (
        <button
          onClick={() => navigate("/customize2")}
          className="min-w-[170px] h-[60px] mt-[35px]
          bg-white text-black font-semibold rounded-full text-[18px]
          hover:bg-blue-200 transition-all duration-300"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
