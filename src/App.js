import React, { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/authContext/AuthContext";
import { useToastContext } from "./context/toastContext/ToastContext";
import { Home } from "./components/home/Home";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoute";
import { Navbar } from "./components/navbar/Navbar";
import { Register } from "./components/register/Register";
import { Search } from "./components/search/Search";
import { Profile } from "./components/profile/Profile";
import { BottomNav } from "./components/bottomNav/BottomNav";
import { User } from "./features/user/User";
import { NewPost } from "./components/newPost/NewPost";
import { TimeLine } from "./components/timeline/TimeLine";

function App() {
  const [hide, setHide] = useState(true);
  const { ToastContainer } = useToastContext();
  const { auth, id } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log({ auth });
    if (!auth) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="App">
      {/*!auth && <Home /> */}
      {auth && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute auth={auth} path="/timeline" element={<TimeLine />} />
        <PrivateRoute auth={auth} path="/search" element={<Search />} />
        <PrivateRoute auth={auth} path="/user/:userId" element={<User />} />
      </Routes>
      <button onClick={() => setHide((prev) => !prev)}>clickme</button>{" "}
      <ToastContainer
        style={{ maxWidth: "400px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NewPost hide={hide} setHide={setHide} />
      {auth && <BottomNav className="bottomLast" />}
    </div>
  );
}

export default App;
