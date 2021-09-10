import React, { useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { useToastContext } from "../../context/toastContext/ToastContext";
import userStyle from "../../features/user/user.module.css";
import { useDispatch } from "react-redux";
import { likeButtonClicked } from "../../features/posts/postSlice";
import { getPostById } from "../../features/posts/postSlice";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../context/authContext/AuthContext";

export const TimelinePost = ({ post }) => {
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  const { auth } = useAuthContext();
  const {
    posts: { like },
    likeStatus,
  } = useSelector((state) => state.posts);
  console.log({ likeStatus });
  const { toast } = useToastContext();
  const dispatch = useDispatch();

  return (
    <div className={userStyle.post}>
      <div className={userStyle.postUser}>
        {post?.user?.profilePicture === "https://i.ibb.co/RztnCHv/user.png" ? (
          <img
            src="https://i.ibb.co/RztnCHv/user.png"
            alt=""
            className={userStyle.postProfile}
          />
        ) : (
          <Image
            cloudName="dtb0aupd7"
            publicId={post?.user?.profilePicture}
            className={userStyle.postProfile}
          />
        )}
        <span style={{ padding: "1rem" }}>
          <Link
            to={`/user/${post?.user?._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className={userStyle.postName}>{post?.user?.name}</span>
            <span className={userStyle.postUsername}>
              {post?.user?.username}
            </span>
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
              if (getUserId === post?.user?._id) {
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
                console.log("here", post?.id);
                if (likeStatus === "idle") {
                  dispatch(getPostById(post?._id, auth)());
                }
                dispatch(
                  likeButtonClicked({
                    userId: getUserId,
                    postId: post?._id,
                  })
                );
              }
            }}
          />
        ) : (
          <IoMdHeartEmpty
            className={userStyle.like}
            onClick={() => {
              if (getUserId === post?.user?._id) {
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
                console.log("here", post?._id);
                if (likeStatus === "idle") {
                  dispatch(getPostById(post?._id, auth)());
                }
                dispatch(
                  likeButtonClicked({
                    userId: getUserId,
                    postId: post?._id,
                  })
                );
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
