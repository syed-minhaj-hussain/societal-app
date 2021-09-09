import { useState } from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.css";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { RiAddBoxFill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { auth, logout } = useAuthContext();
  const getUserId = JSON.parse(localStorage.getItem("_id")) || null;

  return (
    <nav className={navStyle.navbar}>
      <div className={navStyle.brandTitle}>Societal</div>

      <div className={navStyle.navbarLinks}>
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
              <GoSearch style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newPost"
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
              <RiAddBoxFill style={{ fontSize: "1.5rem" }} />
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
              onClick={() => setIsActive((prev) => !prev)}
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
                onClick={() => setIsActive((prev) => !prev)}
              >
                Login
              </NavLink>
            )}
          </li>
            */}
        </ul>
      </div>
    </nav>
  );
};
