import React, { useEffect } from "react";
import { Post } from "../../components/post/Post";
import { Profile } from "../../components/profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getUserIdFromParams } from "./userSlice";
import userStyle from "./user.module.css";
import { useToastContext } from "../../context/toastContext/ToastContext";
import { getUser } from "./userAPI";
import { useParams } from "react-router-dom";

export const User = () => {
  const {
    user: { rest, myFollowers, myFollowing, getAllPostsOfUser },
    status = "idle",
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { toast } = useToastContext();
  const { userId } = useParams();

  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  useEffect(() => {
    dispatch(getUserIdFromParams(userId)());
  }, []);
  console.log({ getAllPostsOfUser });
  return (
    <>
      <div className={userStyle.main}>
        <Profile
          rest={rest}
          myFollowers={myFollowers}
          myFollowing={myFollowing}
          getUserId={getUserId}
        />
        <div className={userStyle.posts}>
          {getAllPostsOfUser?.map((post) => (
            <Post post={post} rest={rest} key={post._id} userId={userId} />
          ))}
        </div>
      </div>
    </>
  );
};
