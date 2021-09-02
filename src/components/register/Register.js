import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/authContext/AuthContext";
import regStyle from "./register.module.css";

export const Register = () => {
  const { auth, register } = useAuthContext();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  const uploadImage = async () => {
    console.log(file);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "is1qtnx4s");

    const data = await axios
      .post("https://api.cloudinary.com/v1_1/dtb0aupd7/image/upload", fd)
      .then((res) => res.data.url);
    return data;
  };

  return (
    <>
      <div className={regStyle.container}>
        <section>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              color: "#000",
            }}
          >
            Societal
          </h1>
          <div className={regStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>
              Enter Your Username & Password{" "}
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                console.log("register");
                const url = await uploadImage();
                if (url) {
                  console.log(url);
                  register(text, email, password, url);
                  setEmail("");
                  setText("");
                  setPassword("");
                }
              }}
            >
              <div className={regStyle.inputs}>
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
              <div className={regStyle.inputs}>
                <label htmlFor="name">Email :</label>
                <input
                  type="email"
                  id="name"
                  placeholder="Enter Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="file">abc</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  // style={{ display: "none" }}
                />
              </div>
              <input type="submit" value="Register" className={regStyle.btn} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
