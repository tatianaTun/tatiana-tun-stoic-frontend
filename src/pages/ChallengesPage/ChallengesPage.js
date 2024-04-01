import "./ChallengesPage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ChallengesPage() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState(null);
  const [user, setUser] = useState(null);
  const [challengeStatuses, setChallengeStatuses] = useState({});

  const getChallenges = async () => {
    try {
      const requestUrl = `${baseURL}/challenges`;
      const result = await axios.get(requestUrl);
      const fetchedChallenges = result.data;
      setChallenges(fetchedChallenges);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const token = sessionStorage.token;
      const profileUrl = `${baseURL}/profile`;
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const getChallengeStatus = async (userId, challengeId) => {
    try {
      const response = await axios.get(
        `${baseURL}/challenges/${userId}/${challengeId}/progress`
      );
      const { status, days } = response.data;
      setChallengeStatuses((prevStatuses) => ({
        ...prevStatuses,
        [challengeId]: { status, days },
      }));
    } catch (error) {
      console.error("Error fetching challenge status:", error);
      //might want to handle this differently, e.g., by setting an error state
      setChallengeStatuses((prevStatuses) => ({
        ...prevStatuses,
        [challengeId]: { status: "Error", days: 0 },
      }));
    }
  };

  useEffect(() => {
    getChallenges();
    getUser();
  }, []);

  useEffect(() => {
    if (user && challenges) {
      challenges.forEach((challenge) => {
        getChallengeStatus(user.id, challenge.id);
      });
    }
  }, [user, challenges]);

  if (!challenges && !user) {
    return <p>Loading...</p>;
  }

  return (
    <section className="challenges">
      <div>
        <h1>Challenges</h1>
        <p>Short text about the benefits of challenging</p>
      </div>
      <div className="challenges__container">
        <h2>Challenges List</h2>
        {challenges.map((challenge) => (
          <article key={challenge.id} className="challenges__challenge-card">
            <div className="challenges__card-text">
            <h4 className="challenges__challenge-name">{challenge.name}</h4>
            <h4 className="challenges__challenge-length">
              {challengeStatuses[challenge.id]?.days || 0}/{challenge.length} days
            </h4>
            </div>
            <Link
              to={`/challenges/${challenge.id}`}
              className={`challenges__challenge-link ${challengeStatuses[challenge.id]?.status === "In Progress" ? "--active" : ""}`}
            >
              {challengeStatuses[challenge.id]?.status || "START"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChallengesPage;
