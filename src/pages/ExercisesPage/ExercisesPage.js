import "./ExercisesPage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import axios from "axios";
import { Link } from "react-router-dom";

function ExercisesPage() {
  const [exercises, setExercises] = useState(null);

  const getExercises = async () => {
    try {
      const requestUrl = `${baseURL}/exercises`;
      const result = await axios.get(requestUrl);
      const fetchedExercises = result.data;
      console.log(fetchedExercises);
      setExercises(fetchedExercises);
      //   if (!exercises) {
      //     setExercises(fetchedExercises);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  if (!exercises) {
    return <p>Loading...</p>;
  }

  return (
    <section className="exercises">
      <div>
        <h1>Exercises</h1>
        <p>Short text about the benefits of exercising stoicism</p>
      </div>
      <div className="exercises__container">
        <h2>Exercises List</h2>
        {exercises.map((exercise) => (
          <article  key={exercise.id} className="exercises__exercise-card">
            <h3 className="exercises__exercise-name">{exercise.name}</h3>
            <Link
              to={`/exercises/${exercise.id}`}
              className="exercises__exercise-link"
            >
              START
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExercisesPage;
