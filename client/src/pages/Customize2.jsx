import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";

export const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useUser();

  const navigate = useNavigate();

  const [assistantName, setAssistantName] = React.useState(
    userData?.assistantName || "",
  );

  const [loading, setLoading] = React.useState(false);

  const token = localStorage.getItem("token");

  const handleUpdateAssistant = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("assistantName", assistantName);

      // UPLOADED IMAGE
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      }

      // PREDEFINED IMAGE
      else if (selectedImage) {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      setUserData(result.data);

      setLoading(false);

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("Update Assistant Error:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex items-center justify-center flex-col">
      {/* BACK BUTTON */}
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]"
        onClick={() => navigate("/customize")}
      />

      {/* HEADING */}
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Enter your <span className="text-blue-200">Assistant Name</span>
      </h1>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Assistant Name eg: Jarvis"
        className="w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent text-white px-5 rounded-full text-[18px] outline-none"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {/* BUTTON */}
      {assistantName && (
        <button
          disabled={loading}
          onClick={handleUpdateAssistant}
          className="min-w-[200px] h-[60px] mt-5 bg-white text-black font-semibold rounded-full text-[18px]"
        >
          {loading ? "Updating..." : "Create Assistant"}
        </button>
      )}
    </div>
  );
};
