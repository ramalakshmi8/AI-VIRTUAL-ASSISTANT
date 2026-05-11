// import React, { useState } from "react";
// import bg from "../assets/authBg.png";
// import { FaRegEye } from "react-icons/fa6";
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../App.jsx";
// import axios from "axios";
// import { useContext } from "react";
// import { useUser } from "../context/UserContext.jsx";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { serverUrl, userData, setUserData } = useContext(UserDataContext);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     setLoading(true);
//     setError("");
//     e.preventDefault();
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         {
//           name,
//           email,
//           password,
//         },
//         { withCredentials: true },
//       );
//       setLoading(false);
//       setUserData(result.data);
//     } catch (error) {
//       setUserData(null);
//       setLoading(false);
//       setError(error.response.data.message);
//       console.log(error);
//     }
//   };
//   return (
//     <div
//       className="w-full h-[100vh] flex items-center justify-center "
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         height: "100vh",
//         width: "100%",
//       }}
//     >
//       <form className="w-[90%] h-[600px] max-w-[500px] bg-black/30 backdrop-blur shadow-lg shadow-black-950 flex flex-col items-center justify-center gap-[20px] px-[20px]">
//         <h1 className="text-white font-semibold text-[30px] mb-[30px]">
//           Register to <span className="text-blue-400">Virtual Assistant</span>
//         </h1>
//         <input
//           type="text"
//           placeholder="Enter your Name"
//           className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <div className="w-full h-[60px] border-2 border-white  bg-transparent text-white px-[20px] py-[10px] rounded-full text-[18px] relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full h-full rounded-full outline-none placeholder-gray-300 bg-transparent"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {!showPassword && (
//             <FaRegEye
//               onClick={() => setShowPassword(true)}
//               className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer"
//             />
//           )}
//           {showPassword && (
//             <FaRegEyeSlash
//               onClick={() => setShowPassword(false)}
//               className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer"
//             />
//           )}
//         </div>
//         {error.length > 0 && (
//           <div className="text-red-500 text-[17px]">*{error}</div>
//         )}
//         <button
//           type="submit"
//           onClick={handleSignUp}
//           disabled={loading}
//           className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
//         >
//           {loading ? "loading..." : " Sign Up"}
//         </button>
//         <p
//           onClick={() => navigate("/signin")}
//           className="text-white text-[18px] cursor-pointer"
//         >
//           Already have an account?{" "}
//           <span className="text-blue-950">Sign In</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const SignUp = () => {
  const { serverUrl, setUserData } = useUser(); // ✅ correct usage

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // ✅ first
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true },
      );

      setUserData(result.data); // ✅ save globally
      navigate("/customize"); // ✅ redirect after signup
    } catch (error) {
      setUserData(null);
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSignUp}
        className="w-[90%] max-w-[500px] h-[600px] bg-black/30 backdrop-blur shadow-lg flex flex-col items-center justify-center gap-5 px-5"
      >
        <h1 className="text-white font-semibold text-[30px] mb-6">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] border-2 border-white bg-transparent text-white px-5 rounded-full text-[18px]"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] border-2 border-white bg-transparent text-white px-5 rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full h-[60px] border-2 border-white text-white px-5 rounded-full relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <FaRegEyeSlash
              onClick={() => setShowPassword(false)}
              className="absolute right-5 cursor-pointer"
            />
          ) : (
            <FaRegEye
              onClick={() => setShowPassword(true)}
              className="absolute right-5 cursor-pointer"
            />
          )}
        </div>

        {error && <p className="text-red-500 text-[16px]">* {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="min-w-[150px] h-[60px] mt-5 bg-white text-black font-semibold rounded-full text-[18px]"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p
          onClick={() => navigate("/signin")}
          className="text-white text-[16px] cursor-pointer"
        >
          Already have an account?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
