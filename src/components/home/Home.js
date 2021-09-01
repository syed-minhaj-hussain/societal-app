import homeStyle from "./home.module.css";
import landingImage from "./social.jpg";
import { Login } from "../login/Login";
export const Home = () => {
  return (
    <div className={homeStyle.main}>
      <div className={homeStyle.leftSide}>
        <img src={landingImage} alt="social" className={homeStyle.image} />
      </div>

      <div className={homeStyle.rightSide}>
        <Login />
      </div>
    </div>
  );
};
