import axios from "axios";
import { baseURL } from "../../consts";
import "./ProfileInfo.scss";
import { useNavigate } from "react-router-dom";

function ProfileInfo({userInfo, level}) {
    const navigate = useNavigate();

    //


// if(!userInfo) {
//     return <p>Loading...</p>
// }

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
        <p className="profile__level">{level}</p>
        <p>Accomplishments: ___</p>
      </div>
    </>
  );
}

export default ProfileInfo;
