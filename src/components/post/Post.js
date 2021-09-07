import React, { useEffect } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { useToastContext } from "../../context/toastContext/ToastContext";
import userStyle from "../../features/user/user.module.css";
import { useDispatch } from "react-redux";
import { likeButtonClicked } from "../../features/user/userSlice";

export const Post = ({ post, rest }) => {
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  const { toast } = useToastContext();
  const dispatch = useDispatch();
  console.log({ post });
  console.log({ rest });
  // console.log(getUserId);
  return (
    <div className={userStyle.post}>
      <div className={userStyle.postUser}>
        {rest?.profilePicture === "https://i.ibb.co/RztnCHv/user.png" ? (
          <img
            src="https://i.ibb.co/RztnCHv/user.png"
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
        {post?.likes?.includes(getUserId) ? (
          <IoMdHeart
            className={userStyle.like}
            onClick={() => {
              if (getUserId === post?.user) {
                toast.error("You Can't Like Your Post!!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                // dispatch(
                //   likeButtonClicked({
                //     userId: getUserId,
                //     postId: post?._id,
                //   })
                // );
              }
            }}
          />
        ) : (
          <IoMdHeartEmpty
            className={userStyle.like}
            onClick={() => {
              if (getUserId === rest?._id) {
                toast.error("You Can't Like Your Post!!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                // dispatch(
                //   likeButtonClicked({
                //     userId: getUserId,
                //     postId: post?._id,
                //   })
                // );
              }
            }}
          />
        )}
        <span className={userStyle.postDescription}>{post.description}</span>
        <p className={userStyle.likeCount}>{post?.likes?.length} likes</p>
      </div>
    </div>
  );
};
