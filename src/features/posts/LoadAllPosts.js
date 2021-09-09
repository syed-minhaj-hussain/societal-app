import React, { useEffect } from "react";
import userStyle from "../user/user.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAuthForFetchPosts } from "./postSlice";
import { TimelinePost } from "../../components/post/TimelinePost";
import { useAuthContext } from "../../context/authContext/AuthContext";

export const LoadAllPosts = () => {
  const { auth, id } = useAuthContext();
  const dispatch = useDispatch();
  const {
    // posts: { allPosts },
    posts,
    status,
    error,
  } = useSelector((state) => state.posts);
  console.log({ status, error });
  useEffect(() => {
    if (status === "idle") {
      console.log({ auth });
      return dispatch(getAuthForFetchPosts(auth)());
    }
    // if (status === "error") {
    //   return dispatch(fetchAllPosts());
    // }
  }, [status, dispatch, auth, id]);

  // console.log({ allPosts });
  return (
    <div className={userStyle.posts}>
      {posts?.allPosts?.map((post) => (
        <TimelinePost post={post} key={post._id} />
      ))}
    </div>
  );
};
