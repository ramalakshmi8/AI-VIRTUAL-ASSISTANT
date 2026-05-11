// import react from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

// create context
const UserDataContext = createContext();

// provider
export const UserProvider = ({ children }) => {
  const serverUrl = "https://assistantbackend-a5qb.onrender.com";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGeminiResponse = async (command) => {
    try {
      console.log("getGeminiResponse called with command:", command);
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true },
      );
      console.log("Gemini response from server:", result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        serverUrl,
        userData,
        setUserData,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// custom hook
export const useUser = () => useContext(UserDataContext);
