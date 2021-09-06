import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { useToastContext } from "../../context/toastContext/ToastContext";
import userStyle from "../../features/user/user.module.css";

export const Post = ({ post, rest }) => {
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  const { toast } = useToastContext();
  const likeButtonPressed = (postUserId) => {
    if (getUserId === postUserId) {
      return toast.error("You Can't Like Your Own Post!!", {
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
    <div className={userStyle.post}>
      <div className={userStyle.postUser}>
        {rest?.profilePicture === "https://i.ibb.co/SQbCLBC/virat-dk.jpg" ? (
          <img
            src="https://i.ibb.co/SQbCLBC/virat-dk.jpg"
            alt=""
            className={userStyle.postProfile}
          />
        ) : (
          <Image
            cloudName="dtb0aupd7"
            publicId={rest?.profilePicture}
            className={userStyle.postProfile}
          />
        )}
        <span style={{ padding: "1rem" }}>
          <Link
            to={`/user/${post?.user}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className={userStyle.postName}>{rest?.name}</span>
            <span className={userStyle.postUsername}>{rest?.username}</span>
          </Link>
        </span>
      </div>

      <Image
        cloudName="dtb0aupd7"
        publicId={post?.image}
        className={userStyle.postImage}
      />
      <div className={userStyle.postBottom}>
        <IoMdHeartEmpty
          className={userStyle.like}
          onClick={() => likeButtonPressed(post?.user)}
        />
        <span className={userStyle.postDescription}>{post.description}</span>
        <p className={userStyle.likeCount}>{post?.likes?.length} likes</p>
      </div>
    </div>
  );
};
