import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../consts";import {useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
  const profileUrl = `${baseURL}/profile`;

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const fetchData = async () => {
    try {
      // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
      const token = sessionStorage.token;
      console.log(token)
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUserInfo(response.data);
      // Remember to include the token in Authorization header
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>Welcome, {userInfo.name}</h2>
      <p>Level: ___</p>
      <p>Accomplishments: ___</p>
      <button onClick={() => {sessionStorage.removeItem("token"); navigate("/")}}>Logout</button>
    </>
  );
}

export default ProfilePage;
