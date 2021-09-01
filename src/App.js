import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./components/home/Home";
import { useToastContext } from "./context/toastContext/ToastContext";
import { Navbar } from "./components/navbar/Navbar";
import { useAuthContext } from "./context/authContext/AuthContext";
import { Register } from "./components/register/Register";

function App() {
  const { ToastContainer } = useToastContext();
  const { auth } = useAuthContext();
  useEffect(() => {
    console.log({ auth });
  }, []);
  return (
    <div className="App">
      {/* !auth && <Home /> */}
      {!auth && <Register />}
      {auth && <Navbar />}
      <ToastContainer />
    </div>
  );
}

export default App;
