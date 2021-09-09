import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useToastContext } from "../toastContext/ToastContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [id, setId] = useState(JSON.parse(localStorage.getItem("_id")) || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  // const getAuthToken = JSON.parse(localStorage.getItem("token")) || null;
  console.log({ auth });
  // console.log(getAuthToken);

  const login = async (text, password) => {
    try {
      const response = await axios.post(
        "https://societal.herokuapp.com/login",
        {
          email: text,
          password: password,
        }
      );
      //
      if (response?.data?.success === true) {
        console.log({ response });
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const authToken = response?.data?.authToken;
        const userId = response?.data?.userId;
        const userDetails = response?.data?.userDetails;
        setAuth(authToken);
        setId(userId);
        setUser(userDetails);
        localStorage.setItem("token", JSON.stringify(authToken));
        localStorage.setItem("_id", JSON.stringify(userId));
        localStorage.setItem("user", JSON.stringify(userDetails));
        setTimeout(() => navigate("/timeline"), 1000);
      } else {
        console.log(response);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      // setAuth(null);
      toast.error(err?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log({ error: err?.response?.data?.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("user");
    setAuth(null);
    setId(null);
    setUser(null);
    toast.success("User Logged Out Successfully!!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };

  const register = async (
    text,
    username,
    email,
    password,
    url,
    location,
    description
  ) => {
    try {
      const response = await axios.post(
        "https://societal.herokuapp.com/register",
        {
          name: text,
          username: username,
          email: email,
          password: password,
          profilePicture: url,
          description: description,
          location: location,
        }
      );

      if (response?.data?.success === true) {
        console.log(response);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      } else {
        console.log(response);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log({ error: err?.response?.data?.message });
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        setAuth,
        auth,
        id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
