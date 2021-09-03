import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByUserId } from "./userSlice";
import userStyle from "./user.module.css";
import { ImLocation2 } from "react-icons/im";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Image } from "cloudinary-react";

export const User = () => {
  const {
    user: { rest, myFollowers, myFollowing },
    status,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log({ rest });
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserByUserId());
    }
  }, [dispatch, status]);
  console.log(rest?._id !== getUserId);
  return (
    <>
      <div className={userStyle.main}>
        <div className={userStyle.userProfile}>
          <div className={userStyle.leftSide}>
            {rest?.profilePicture ===
            "https://i.ibb.co/SQbCLBC/virat-dk.jpg" ? (
              <img
                src="https://i.ibb.co/SQbCLBC/virat-dk.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  padding: "0.3rem",
                  backgroundColor: "black",
                }}
              />
            ) : (
              <Image
                cloudName="dtb0aupd7"
                publicId={rest?.profilePicture}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  padding: "0.3rem",
                  backgroundColor: "black",
                }}
              />
            )}
          </div>
          <div className={userStyle.rightSide}>
            <div>
              {" "}
              <h1 className={userStyle.name}>{rest?.name}</h1>
              <p className={userStyle.username}>{rest?.username}</p>
              <h1 className={userStyle.followers}>
                <span style={{ fontWeight: "bold" }}>
                  {myFollowers?.length}
                </span>{" "}
                followers &nbsp;{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {myFollowing?.length}
                </span>{" "}
                following
              </h1>
              <p className={userStyle.location}>
                <ImLocation2 />
                {rest?.location}
              </p>
              <HiOutlineInformationCircle
                className={userStyle.descriptionIcon}
              />
              <h2 className={userStyle.description}> {rest?.description}</h2>
              {rest?._id !== getUserId && (
                <button className={userStyle.btn}>
                  {myFollowing?.includes(rest._id) ? "unfollow" : "follow"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={userStyle.posts}></div>
      </div>
    </>
  );
};
