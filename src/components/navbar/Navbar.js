import { useState } from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.css";
// import { useAuthContext } from "../../context/AuthContext";
import { FaHistory } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { ImHome } from "react-icons/im";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  //   const { auth, logout } = useAuthContext();

  return (
    <nav className={navStyle.navbar}>
      <div className={navStyle.brandTitle}>Societal</div>
      <button
        className={navStyle.toggleButton}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <span className={navStyle.bar}></span>
        <span className={navStyle.bar}></span>
        <span className={navStyle.bar}></span>
      </button>
      <div
        className={`${
          isActive
            ? `${navStyle.navbarLinks} ${navStyle.active}`
            : navStyle.navbarLinks
        }`}
      >
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
              onClick={() => setIsActive((prev) => !prev)}
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
              onClick={() => setIsActive((prev) => !prev)}
            >
              <AiFillLike style={{ fontSize: "1.25rem" }} />
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
              onClick={() => setIsActive((prev) => !prev)}
            >
              <FaHistory style={{ fontSize: "1.1rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              style={{ position: "relative" }}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <MdWatchLater style={{ fontSize: "1.25rem" }} />
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
                onClick={() => setIsActive((prev) => !prev)}
              >
                Login
              </NavLink>
            )}
          </li>
            */}{" "}
        </ul>
      </div>
    </nav>
  );
};
