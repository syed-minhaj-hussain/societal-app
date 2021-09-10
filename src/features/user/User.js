import React, { useEffect } from "react";
import { Post } from "../../components/post/Post";
import { Profile } from "../../components/profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getUserIdFromParams } from "./userSlice";
import userStyle from "./user.module.css";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/authContext/AuthContext";

export const User = () => {
  const {
    user: { rest, myFollowers, myFollowing, getAllPostsOfUser },
    status,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { auth } = useAuthContext();
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  useEffect(() => {
    dispatch(getUserIdFromParams(userId, auth)());
  }, [userId]);
  console.log({ getAllPostsOfUser });
  console.log({ status });
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
          {getAllPostsOfUser?.length === 0 && <h1>No Posts</h1>}
          {getAllPostsOfUser?.map((post) => (
            <Post post={post} rest={rest} key={post._id} userId={userId} />
          ))}
        </div>
      </div>
    </>
  );
};
