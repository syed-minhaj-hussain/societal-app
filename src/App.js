import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/authContext/AuthContext";
import { useToastContext } from "./context/toastContext/ToastContext";
import { Home } from "./components/home/Home";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoute";
import { Navbar } from "./components/navbar/Navbar";
import { Register } from "./components/register/Register";
import { Search } from "./components/search/Search";
import { BottomNav } from "./components/bottomNav/BottomNav";
import { User } from "./features/user/User";
import { NewPost } from "./components/newPost/NewPost";
import { LoadAllPosts } from "./features/posts/LoadAllPosts";

function App() {
  const { ToastContainer } = useToastContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log({ auth });
    if (!auth) {
      return navigate("/");
    }
  }, [auth]);

  return (
    <div className="App">
      {auth && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute auth={auth} path="/timeline" element={<LoadAllPosts />} />
        <PrivateRoute auth={auth} path="/search" element={<Search />} />
        <PrivateRoute auth={auth} path="/user/:userId" element={<User />} />
        <PrivateRoute auth={auth} path="/newPost" element={<NewPost />} />
      </Routes>
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
      {auth && <BottomNav className="bottomLast" />}
    </div>
  );
}

export default App;
