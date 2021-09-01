import { useState } from "react";
import logStyle from "./login.module.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section>
      <h1 className={logStyle.heading}>Societal</h1>
      <div className={logStyle.card}>
        <h3 style={{ marginBottom: "1rem" }}>
          Enter Your Username & Password{" "}
        </h3>
        <form
        //   onSubmit={(e) => {
        //     e.preventDefault();
        //     login(text, password, state?.from);
        //     // console.log(val);
        //     setText("");
        //     setPassword("");
        //   }}
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
