import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext/AuthContext";
import regStyle from "./register.module.css";
import { useToastContext } from "../../context/toastContext/ToastContext";

export const Register = () => {
  const { auth, register } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (auth) {
      navigate("/timeline");
    }
  }, []);

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
              marginTop: "0.5rem",
              fontSize: "2.25rem",
            }}
          >
            Societal
          </h1>
          <div className={regStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>Enter Your Credentials</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (
                  text === "" ||
                  username === "" ||
                  email === "" ||
                  password === ""
                ) {
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
                const url = await uploadImage();
                if (url) {
                  console.log(url);
                  register(
                    text,
                    username,
                    email,
                    password,
                    url,
                    location,
                    description
                  );
                  setEmail("");
                  setText("");
                  setPassword("");
                  setLocation("");
                  setDescription("");
                }
              }}
            >
              <div className={regStyle.inputs}>
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Name..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ marginLeft: "2.9rem" }}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="username">Username :</label>
                <input
                  type="text"
                  name=""
                  id="username"
                  placeholder="Enter Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
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
                <label htmlFor="location">Location:</label>
                <input
                  type="location"
                  id="location"
                  placeholder="Enter location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ marginLeft: "1.6rem" }}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="description">Description: </label>
                <input
                  type="description"
                  id="description"
                  placeholder="Enter description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ marginLeft: "0rem" }}
                />
              </div>
              <div className={regStyle.inputImage}>
                <label htmlFor="file" className={regStyle.labelImage}>
                  <BsFillImageFill className={regStyle.image} /> Upload Picture
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <input type="submit" value="Register" className={regStyle.btn} />
            </form>
          </div>
          <p style={{ textAlign: "center", color: "black" }}>
            Already have an account ? <Link to="/">login</Link>{" "}
          </p>
        </section>
      </div>
    </>
  );
};
