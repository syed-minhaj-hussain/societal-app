import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./bottomNav.module.css";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { BsBellFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";

export const BottomNav = () => {
  const { auth, logout } = useAuthContext();
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;
  return (
    <div className={navStyle.bottomNavbar}>
      <div className={navStyle.bottom}>
        <ul>
          <li>
            <NavLink
              to="/timeline"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              end
            >
              <ImHome style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
            >
              <GoSearch style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              style={{ position: "relative" }}
            >
              <BsBellFill style={{ fontSize: "1.1rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/user/${getUserId}`}
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              style={{ position: "relative" }}
            >
              <FaUserAlt style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          {/* <li className={`${auth ? `${navStyle.logout}` : ""} `}>
            {auth ? (
              <button
                className={navStyle.last}
                onClick={() => {
                  logout();
                  setIsActive((prev) => !prev);
                }}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#333",
                  backgroundColor: "rgb(220,152,20)",
                  height: "100%",
                }}
                className={navStyle.navLinks}
               
              >
                Login
              </NavLink>
            )}
          </li>
            */}
        </ul>
      </div>
    </div>
  );
};
