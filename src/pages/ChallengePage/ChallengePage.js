import "./ChallengePage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ChallengePage() {
  const navigate = useNavigate();

  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [user, setUser] = useState(null);

  const [buttonText, setButtonText] = useState("START DAY 1");
  const [buttonColor, setButtonColor] = useState(""); // default or your initial button color
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const [doneMessage, setDoneMessage] = useState(null);
  const [daysCountUpdated, setDaysCountUpdated] = useState(false);
  const [statusChallenge, setStatusChallenge] = useState(false);
  const [days, setDays] = useState(null);

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

  const getChallenge = async () => {
    try {
      const requestUrl = `${baseURL}/challenges/${challengeId}`;
      const result = await axios.get(requestUrl);
      const fetchedChallenge = result.data;
      setChallenge(fetchedChallenge);
    } catch (error) {
      console.log(error);
    }
  };

  const getChallengeStatus = async () => {
    try {
      console.log(user.id);
      const response = await axios.get(
        `${baseURL}/challenges/${user.id}/${challenge.id}/progress`
      );
      const { status, days } = response.data;
      if (status) {
        console.log(`Challenge Status: ${status}. Days ${days}`);
        if (status === "In Progress") {
          setButtonText(`START DAY ${days + 1}`);
        }
        setDays(days);
        setStatusChallenge(true);
      } else {
        console.log("Challenge status not found.");
      }
    } catch (error) {
      console.error("Error fetching challenge status:", error);
    }
  };

  const startChallenge = async () => {
    try {
      const requestUrl = `${baseURL}/challenges/${user.id}/${challenge.id}/progress`;
      const response = await axios.post(requestUrl, {
        user_id: user.id,
        challenge_id: challenge.id,
      });
      console.log("Challenge started successfully", response.data);
      setDays(0);
    } catch (error) {
      console.error("Error starting challenge:", error);
    }
  };

  const startChallengeHandler = async () => {
    setStatusChallenge(true);
    startChallenge();
  };

  const updateDaysCount = async (daysDone, statusChallenge) => {
    let status = "In Progress";
    if (!statusChallenge && daysDone === 0) {
      status = "Not Started";
    }
    try {
      const requestUrl = `${baseURL}/challenges/${user.id}/${challenge.id}/progress`;
      const result = await axios.patch(requestUrl, {
        days: daysDone,
        status: status,
      });
      console.log("Challenge days count updated successfully");
      setDays(daysDone);
      setDaysCountUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPoints = async () => {
    try {
      const profileUrl = `${baseURL}/profile`;
      const token = sessionStorage.token;
      const response = await axios.patch(
        profileUrl,
        { points: challenge.points },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user points updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const daysCountHandler = () => {
    let daysDone = 0;
    console.log(days);
    if (buttonText === `RESTART THE CHALLENGE`) {
      setButtonText("START DAY 1");
      setDoneMessage(null);
      setDaysCountUpdated(true);
    } else if (days === challenge.length - 1) {
      setButtonText(`RESTART THE CHALLENGE`);
      setDoneMessage(
        `Congratulations! You have done the challenge! You earn ${challenge.points} points for it.`
      );
      // setStatusChallenge(false)
      updateDaysCount(daysDone, false);
      updateUserPoints();
    } else {
      daysDone = days + 1;
      setDoneMessage(`Day ${daysDone} done`);
      setButtonText(`START DAY ${daysDone + 1}`);
      // setButtonColor("gray");
      setShowDoneMessage(true);
      updateDaysCount(daysDone);
    }
  };

  useEffect(() => {
    getUser();
    getChallenge();
  }, []);

  useEffect(() => {
    if (user && challenge) {
      getChallengeStatus();
    }
    setDaysCountUpdated(false);
  }, [daysCountUpdated, user, challenge, statusChallenge]);

  if (!challenge) {
    return <p>Loading...</p>;
  }

  return (
    <div className="challenge">
      <section className="challenge__container">
        <h1>{challenge.name}</h1>
        <p>{challenge.description}</p>
        <h3>Benefits</h3>
        <p>{challenge.benefits}</p>
        <h3>Length</h3>
        <p>{challenge.length} days</p>
        <h3>Note</h3>
        <p className="challenge__note">
          Challenges are based on the honor system and the responsibility for
          completing them belongs to you. What a great opportunity to exercise
          will power!
        </p>
        {!statusChallenge && (
          <button
            className="challenge__start-button"
            onClick={startChallengeHandler}
            style={{ backgroundColor: buttonColor }}
          >
            START CHALLENGE
          </button>
        )}
        {showDoneMessage && (
          <p className="challenge__completion-message">{doneMessage}</p>
        )}
        {statusChallenge && (
          <button
            className="challenge__count-button"
            onClick={daysCountHandler}
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </button>
        )}
      </section>
    </div>
  );
}

export default ChallengePage;
