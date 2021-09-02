import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/authContext/AuthContext";
import { useToastContext } from "./context/toastContext/ToastContext";
import { Home } from "./components/home/Home";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoute";
import { Navbar } from "./components/navbar/Navbar";
import { Register } from "./components/register/Register";
import { Search } from "./components/search/Search";
import { Profile } from "./components/profile/Profile";

function App() {
  const { ToastContainer } = useToastContext();
  const { auth } = useAuthContext();
  useEffect(() => {
    console.log({ auth });
  }, []);
  return (
    <div className="App">
      {/* !auth && <Home /> */}
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute auth={auth} path="/search" element={<Search />} />
        <PrivateRoute auth={auth} path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
