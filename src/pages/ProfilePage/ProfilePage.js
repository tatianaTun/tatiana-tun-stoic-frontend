import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../consts";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
const profileUrl = `${baseURL}/profile`;

function ProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [level, setLevel] = useState(null);

  const levels = [
    "Level 1 : Novice Navigator",
    "Level 2 : Aspiring Apprentice",
    "Level 3 : Virtue Voyager",
    "Level 4 : Resilience Rookie",
    "Level 5 : Tranquility Traveler",
    "Level 6 : Wisdom Warrior",
    "Level 7 : Equanimity Explorer",
    "Level 8 : Fortitude Philosopher",
    "Level 9 : Sage Seeker",
    "Level 10 : Stoic Sage",
  ];

  const fetchData = async () => {
    try {
      const token = sessionStorage.token;
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const getLevel = () => {
    if (0 <= userInfo.points && userInfo.points < 5) {
      setLevel(levels[0]);
    } else if (4 < userInfo.points && userInfo.points < 10) {
      setLevel(levels[1]);
    } else if (9 < userInfo.points && userInfo.points < 15) {
      setLevel(levels[2]);
    } else if (14 < userInfo.points && userInfo.points < 20) {
      setLevel(levels[3]);
    } else if (19 < userInfo.points && userInfo.points < 25) {
      setLevel(levels[4]);
    } else if (24 < userInfo.points && userInfo.points < 30) {
      setLevel(levels[5]);
    } else if (29 < userInfo.points && userInfo.points < 35) {
      setLevel(levels[6]);
    } else if (34 < userInfo.points && userInfo.points < 40) {
      setLevel(levels[7]);
    } else if (39 < userInfo.points && userInfo.points < 45) {
      setLevel(levels[8]);
    } else if (44 < userInfo.points) {
      setLevel(levels[9]);
    }
  };

  useEffect(() => {
    if (!sessionStorage.token) {
      navigate("/signup");
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (userInfo && typeof userInfo.points === "number") {
      getLevel();
    }
  }, [userInfo]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="profile">
      <ProfileInfo userInfo={userInfo} level={level} />
    </div>
  );
}

export default ProfilePage;
