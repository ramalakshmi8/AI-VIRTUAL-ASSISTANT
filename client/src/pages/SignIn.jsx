import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const SignIn = () => {
  const { serverUrl, setUserData } = useUser(); // ✅ correct

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // ✅ important
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      setUserData(result.data); // ✅ store globally
      navigate("/"); // ✅ redirect after login
    } catch (error) {
      setUserData(null);
      setError(error.response?.data?.message || "Login failed. Try again.");
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
        onSubmit={handleSignIn}
        className="w-[90%] max-w-[500px] h-[600px] bg-black/30 backdrop-blur shadow-lg flex flex-col items-center justify-center gap-5 px-5"
      >
        <h1 className="text-white font-semibold text-[30px] mb-6">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

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
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-white text-[16px] cursor-pointer"
        >
          Want to create a new account?{" "}
          <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
