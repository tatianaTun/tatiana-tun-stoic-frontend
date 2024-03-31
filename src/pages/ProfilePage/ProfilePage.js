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

  const fetchUser = async () => {
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
    if (0 <= userInfo.points && userInfo.points < 19) {
      setLevel(levels[0]);
    } else if (20 < userInfo.points && userInfo.points < 39) {
      setLevel(levels[1]);
    } else if (40 < userInfo.points && userInfo.points < 59) {
      setLevel(levels[2]);
    } else if (60 < userInfo.points && userInfo.points < 79) {
      setLevel(levels[3]);
    } else if (80 < userInfo.points && userInfo.points < 99) {
      setLevel(levels[4]);
    } else if (100 < userInfo.points && userInfo.points < 119) {
      setLevel(levels[5]);
    } else if (120 < userInfo.points && userInfo.points < 139) {
      setLevel(levels[6]);
    } else if (140 < userInfo.points && userInfo.points < 159) {
      setLevel(levels[7]);
    } else if (160 < userInfo.points && userInfo.points < 179) {
      setLevel(levels[8]);
    } else if (180 < userInfo.points) {
      setLevel(levels[9]);
    }
  };

  useEffect(() => {
    if (!sessionStorage.token) {
      navigate("/signup");
    } else {
      fetchUser();
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
