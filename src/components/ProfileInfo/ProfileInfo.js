import axios from "axios";
import { baseURL } from "../../consts";
import "./ProfileInfo.scss";
import { useNavigate } from "react-router-dom";

function ProfileInfo({userInfo, level}) {
    const navigate = useNavigate();

  return (
    <>
      {" "}
      <div className="profile__user-info">
        <div className="profile__header-container"><h3>Welcome, {userInfo.name}</h3>
        <button
         className="profile__logout-button"
          onClick={() => {
            sessionStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log out
        </button></div>
        <h4 className="profile__level">{level}</h4>
        <p>Points: {userInfo.points}</p>
      </div>
    </>
  );
}

export default ProfileInfo;
