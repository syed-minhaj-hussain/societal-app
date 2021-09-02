import { useEffect, useState } from "react";
import logStyle from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { useToastContext } from "../../context/toastContext/ToastContext";

export const Login = () => {
  const { toast } = useToastContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, []);

  return (
    <section>
      <h1 className={logStyle.heading}>Societal</h1>
      <div className={logStyle.card}>
        <h3 style={{ marginBottom: "1rem" }}>
          Enter Your Username & Password{" "}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text === "" || password === "") {
              return toast.error("Input Fields Are Empty", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            login(text, password);
            setText("");
            setPassword("");
          }}
        >
          <div className={logStyle.inputs}>
            <label htmlFor="name">Username :</label>
            <input
              type="text"
              name=""
              id="name"
              placeholder="Enter Username..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={logStyle.inputs}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name=""
              id="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className={logStyle.btn} />
        </form>
      </div>
      <p style={{ textAlign: "center" }}>
        Don't have an account ? <Link to="/register">register</Link>{" "}
      </p>
    </section>
  );
};
