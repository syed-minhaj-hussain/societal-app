import React, { useEffect } from "react";
import userStyle from "../user/user.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "./postSlice";
import { TimelinePost } from "../../components/post/TimelinePost";

export const LoadAllPosts = () => {
  const dispatch = useDispatch();
  const {
    posts: { allPosts },
    status,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);
  console.log({ allPosts });
  return (
    <div className={userStyle.posts}>
      {allPosts?.map((post) => (
        <TimelinePost post={post} key={post._id} />
      ))}
    </div>
  );
};
