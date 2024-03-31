import "./ChallengePage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import { useParams } from "react-router-dom";
import axios from "axios";
function ChallengePage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);

  const [buttonText, setButtonText] = useState("START DAY 1");
  const [buttonColor, setButtonColor] = useState(""); // default or your initial button color
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const [doneMessage, setDoneMessage] = useState(null);
  const [daysCountUpdated, setDaysCountUpdated] = useState(false);

  const getChallenge = async () => {
    try {
      const requestUrl = `${baseURL}/challenges/${challengeId}`;
      const result = await axios.get(requestUrl);
      const fetchedChallenge = result.data;
      console.log(result.data.days);
      if (result.data.days !== 0) {
        setButtonText(`START DAY ${result.data.days + 1}`);
      }
      setChallenge(fetchedChallenge);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDaysCount = async (daysDone) => {
    try {
      const requestUrl = `${baseURL}/challenges/${challengeId}`;
      const result = await axios.patch(requestUrl, {
        days: daysDone,
      });
      console.log(result);
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
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  const daysCountHandler = () => {
    let daysDone = 0;
    if (challenge.days === challenge.length - 1) {
      setButtonText(`RESTART THE CHALLENGE`);
      setDoneMessage(
        `Congratulations! You have done the challenge! You earn ${challenge.points} points for it.`
      );
      updateDaysCount(daysDone);
      //connect to the user profile to add points to their account
      updateUserPoints();
    } else if (buttonText === `RESTART THE CHALLENGE`) {
      setButtonText("START DAY 1");
      setDaysCountUpdated(true);
    } else {
      daysDone = challenge.days + 1;
      setDoneMessage(`Day ${challenge.days + 1} done`);
      setButtonText(`START DAY ${challenge.days + 2}`);
      // setButtonColor("gray");
      setShowDoneMessage(true);
      updateDaysCount(daysDone);
    }
  };

  useEffect(() => {
    getChallenge();
    setDaysCountUpdated(false);
    // if (challenge.days !== 0) {
    //   setButtonText(`START DAY ${challenge.days + 1}`);
    // }
  }, [daysCountUpdated]);

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
        {showDoneMessage && (
          <p className="challenge__completion-message">{doneMessage}</p>
        )}
        <button
          className="challenge__count-button"
          onClick={daysCountHandler}
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </button>
      </section>
    </div>
  );
}

export default ChallengePage;
