import "./ChallengePage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import { useParams } from "react-router-dom";
import axios from "axios";
function ChallengePage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);

  const getChallenge = async () => {
    try {
      const requestUrl = `${baseURL}/challenges/${challengeId}`;
      const result = await axios.get(requestUrl);
      const fetchedChallenge = result.data;
      if (!challenge) {
        setChallenge(fetchedChallenge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallenge();
  }, []);

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
          Challenges are based on the honor system and the responsibility for completing them belongs to you. What a great opportunity to exercise will power!
        </p>
        <button className="challenge__count-button">
          START
        </button>
      </section>
    </div>
  );
}

export default ChallengePage;
