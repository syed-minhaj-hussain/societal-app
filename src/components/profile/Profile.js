import userStyle from "../../features/user/user.module.css";
import { ImLocation2 } from "react-icons/im";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Image } from "cloudinary-react";
export const Profile = ({ rest, myFollowers, myFollowing, getUserId }) => {
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
            <button className={userStyle.btn}>
              {myFollowing?.includes(rest?._id) ? "unfollow" : "follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
