import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Customize from "./pages/Customize.jsx";
import Home from "./pages/Home.jsx";
import { useUser } from "./context/UserContext"; // ✅ correct
import { Customize2 } from "./pages/Customize2.jsx";

const App = () => {
  const { userData, loading } = useUser(); // ✅ correct

  // 🔥 prevent flicker while loading user
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />

      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
};

export default App;
