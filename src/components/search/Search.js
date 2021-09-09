import React, { useEffect, useState } from "react";
import searchStyle from "./search.module.css";
import { searchUserByName } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
      <form>
        <label htmlFor="search">Search User</label>
        <br />
        <input
          type="text"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};
