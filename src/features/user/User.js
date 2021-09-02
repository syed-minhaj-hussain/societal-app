import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByUserId } from "./userSlice";
import userStyle from "./user.module.css";
import { ImLocation2 } from "react-icons/im";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Image } from "cloudinary-react";

export const User = () => {
  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log({ user });
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserByUserId());
    }
  }, [dispatch, status]);
  return (
    <>
      <div className={userStyle.main}>
        <div className={userStyle.userProfile}>
          <div className={userStyle.leftSide}>
            <Image
              cloudName="dtb0aupd7"
              publicId="https://res.cloudinary.com/dtb0aupd7/image/upload/v1630583058/zs9wt9curf4ebhzylbdd.png"
            />
          </div>
          <div className={userStyle.rightSide}>
            <h1 className={userStyle.name}>{user?.name}</h1>
            <p className={userStyle.username}>{user?.username}</p>

            <h1 className={userStyle.followers}>
              <span style={{ fontWeight: "bold" }}>
                {user?.followers?.length}
              </span>{" "}
              followers &nbsp;{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {user?.following?.length}
              </span>{" "}
              following
            </h1>
            <p className={userStyle.location}>
              <ImLocation2 />
              {user?.location}
            </p>
            <HiOutlineInformationCircle className={userStyle.descriptionIcon} />
            <h2 className={userStyle.description}> {user?.description}</h2>
          </div>
        </div>
        <div className={userStyle.posts}></div>
      </div>
    </>
  );
};
