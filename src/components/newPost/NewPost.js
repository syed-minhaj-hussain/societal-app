import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext/AuthContext";
import newPostStyle from "./newpost.module.css";
import { useToastContext } from "../../context/toastContext/ToastContext";

export const NewPost = ({ hide, setHide }) => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const getUserId = JSON.parse(localStorage?.getItem("_id"));

  // useEffect(() => {
  //   if (auth) {
  //     navigate("/timeline");
  //   }
  // }, []);

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
      <div
        className={`${
          hide ? newPostStyle.hideContainer : newPostStyle.container
        } `}
      >
        <section>
          <div className={newPostStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>New Post</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (description === "") {
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
                try {
                  const url = await uploadImage();
                  if (url) {
                    const response = await axios.post(
                      `http://localhost:5000/post`,
                      {
                        description: description,
                        image: url,
                      },
                      {
                        headers: { authorization: auth },
                      }
                    );
                    console.log({ response });
                    if (response?.data?.success === true) {
                      return toast.success(response?.data?.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                    if (response?.data?.success === false) {
                      return toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                    setDescription("");
                  }
                } catch (err) {
                  console.log({ err });
                  return toast.error("Please Upload Image!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }}
            >
              <div className={newPostStyle.inputs}>
                {/*<label
                  htmlFor="description"
                  // style={{ textAlign: "left", fontWeight: "600" }}
                  className={newPostStyle.left}
                >
                  Description :
                </label>
               <br /> */}
                <textarea
                  id="description"
                  placeholder="Enter description..."
                  cols="60"
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={newPostStyle.inputImage}>
                <label htmlFor="file" className={newPostStyle.labelImage}>
                  <BsFillImageFill className={newPostStyle.image} /> Upload
                  Picture
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <br />
              <input type="submit" value="Post" className={newPostStyle.btn} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
