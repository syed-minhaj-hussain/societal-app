import userStyle from "../../features/user/user.module.css";
import { ImLocation2 } from "react-icons/im";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Image } from "cloudinary-react";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { useDispatch } from "react-redux";
import { followButtonClicked } from "../../features/user/userSlice";
import { followUser, unFollowUser } from "../../features/user/userSlice";

export const Profile = ({ rest, myFollowers, myFollowing, getUserId }) => {
  const { logout, auth } = useAuthContext();
  const dispatch = useDispatch();
  const getUserDetails = JSON.parse(localStorage.getItem("user")) || null;
  console.log({ getUserDetails });
  console.log({ myFollowing, myFollowers });
  console.log({ rest });
  return (
    <div className={userStyle.userProfile}>
      <div className={userStyle.leftSide}>
        {rest?.profilePicture === "https://i.ibb.co/RztnCHv/user.png" ? (
          <img
            src="https://i.ibb.co/RztnCHv/user.png"
            alt=""
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "0.3rem solid black",
              padding: "0.3rem",
              backgroundColor: "#fff",
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
            <span className={userStyle.followersBtn}>
              {myFollowers?.length}{" "}
              <span style={{ fontWeight: "400" }}>followers</span>
            </span>{" "}
            <span className={userStyle.followersBtn}>
              {" "}
              <br className={userStyle.moblie} />
              {myFollowing?.length}{" "}
              <span style={{ fontWeight: "400" }}>following</span>
            </span>{" "}
          </h1>
          <p className={userStyle.location}>
            <ImLocation2 />
            {rest?.location ? rest.location : "India"}
          </p>
          <HiOutlineInformationCircle className={userStyle.descriptionIcon} />
          <h2 className={userStyle.description}>
            {" "}
            {rest?.description ? rest.description : "Available"}
          </h2>
          {rest?._id !== getUserId && (
            <button
              className={userStyle.btn}
              onClick={() => {
                if (
                  !myFollowers?.some(({ _id }) => _id === getUserDetails._id)
                ) {
                  console.log("You ALready Follow This User");
                  dispatch(followUser(rest?._id, getUserId, auth)());
                  dispatch(
                    followButtonClicked({
                      _id: getUserDetails?._id,
                      name: getUserDetails?.name,
                      profilePicture: getUserDetails?.profilePicture,
                      username: getUserDetails?.username,
                    })
                  );
                } else {
                  dispatch(unFollowUser(rest?._id, getUserId, auth)());
                  dispatch(
                    followButtonClicked({
                      _id: getUserDetails?._id,
                      name: getUserDetails?.name,
                      profilePicture: getUserDetails?.profilePicture,
                      username: getUserDetails?.username,
                    })
                  );
                }
              }}
            >
              {myFollowers?.some(({ _id }) => _id === getUserDetails._id)
                ? "unfollow"
                : "follow"}
            </button>
          )}
          {rest?._id === getUserId && (
            <div>
              <button className={userStyle.btn}>Edit Profile</button>
              <button onClick={() => logout()} className={userStyle.btn}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
