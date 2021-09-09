import React, { useEffect, useState } from "react";
import searchStyle from "./search.module.css";
import userStyle from "../../features/user/user.module.css";
import { searchUserByName } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    searchUser: { users },
    searchStatus,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const useDebounce = (searchValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(searchValue);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(searchValue), delay);
      return () => clearTimeout(handler);
    }, [searchValue]);
    return debouncedValue;
  };

  const getValueForCallingApi = useDebounce(searchValue, 500);
  useEffect(() => {
    if (getValueForCallingApi) {
      dispatch(searchUserByName(getValueForCallingApi)());
    }
  }, [getValueForCallingApi]);
  console.log({ users });
  console.log({ searchStatus });
  return (
    <div className={searchStyle.main}>
      <form
        className={searchStyle.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/*<label
          htmlFor="search"
          className={searchStyle.label}
          style={{ textAlign: "center" }}
        >
          Search User
        </label>
        <br /> */}
        <input
          type="text"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={searchStyle.input}
          placeholder="Search User.."
        />
      </form>
      <div className={searchStyle.searchComponentWrapper}>
        {users?.map((user) => (
          <div className={searchStyle.searchComponent} key={user?._id}>
            <Link
              to={`/user/${user?._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={userStyle.postUser}>
                {user?.profilePicture ===
                "https://i.ibb.co/RztnCHv/user.png" ? (
                  <img
                    src="https://i.ibb.co/RztnCHv/user.png"
                    alt=""
                    className={userStyle.postProfile}
                  />
                ) : (
                  <Image
                    cloudName="dtb0aupd7"
                    publicId={user?.profilePicture}
                    className={userStyle.postProfile}
                  />
                )}
                <span style={{ padding: "1rem" }}>
                  <span className={userStyle.postName}>{user?.name}</span>
                  <span className={userStyle.postUsername}>
                    {user?.username}
                  </span>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
