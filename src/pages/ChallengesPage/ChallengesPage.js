import "./ChallengesPage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import axios from "axios";
import { Link } from "react-router-dom";

function ChallengesPage() {
  const [challenges, setChallenges] = useState(null);

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

  useEffect(() => {
    getChallenges();
  }, []);

  if (!challenges) {
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
          <article  key={challenge.id} className="challenges__challenge-card">
            <h4 className="challenges__challenge-name">{challenge.name}</h4>
            <h4>{challenge.days}/{challenge.length}</h4>
            <Link
              to={`/challenges/${challenge.id}`}
              className="challenges__challenge-link"
            >
              DO
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChallengesPage;
