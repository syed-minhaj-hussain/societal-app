import { set } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import React, { useEffect, useState } from "react";
import searchStyle from "./search.module.css";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  // const [data, setData] = useState([]);
  // const [search, setSearch] = useState(false);
  // const useDebounce = (searchValue, delay) => {
  //   const [debouncedValue, setDebouncedValue] = useState(searchValue);
  //   useEffect(() => {
  //     const handler = setTimeout(() => setDebouncedValue(searchValue), delay);
  //     return () => clearTimeout(handler);
  //   }, [searchValue]);
  //   return debouncedValue;
  // };

  // const getValueForCallingApi = useDebounce(searchValue, 500);
  // useEffect(() => {
  //   if (getValueForCallingApi) {
  //     setSearch((prev) => !prev);
  //     alert(searchValue);
  //     // setSearch((prev) => !prev);
  //     setData([{ a: "Hi" }]);
  //   }
  // }, [getValueForCallingApi]);

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
