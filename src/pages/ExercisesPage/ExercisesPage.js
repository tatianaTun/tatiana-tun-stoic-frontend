import "./ExercisesPage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import axios from "axios";
import { Link } from "react-router-dom";

function ExercisesPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const content =
    "1. Bouncing Back Stoicism teaches you to accept things you can't change, which helps you deal with tough times better, making you less stressed and worried. 2. Handling Feelings Better Stoicism helps you think about your feelings and why you have them, which means you can manage them better. This is good for making decisions and getting along with others. ";
  const previewLength = 100;
  const [exercises, setExercises] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getExercises = async (tag) => {
    try {
      const requestUrl =
        tag === "All"
          ? `${baseURL}/exercises`
          : `${baseURL}/exercises?tag=${tag}`;
      const result = await axios.get(requestUrl);
      const fetchedExercises = result.data;
      setExercises(fetchedExercises);
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async () => {
    try {
      const requestUrl = `${baseURL}/tags`;
      const response = await axios.get(requestUrl);

      setTags(["All", ...response.data.map((tag) => tag.tag_name)]);
    } catch (error) {
      console.log("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    getTags();
    getExercises(selectedTag);
  }, [selectedTag]);

  if (!exercises) {
    return <p>Loading...</p>;
  }

  return (
    <section className="exercises">
      <div>
        <h1>Exercises</h1>
        <p>
          Regularly practicing Stoicism can offer numerous benefits for mental
          and emotional well-being, resilience, and personal development.
          Hereare some of the key reasons why engaging with Stoic exercises and
          principles on a regular basis can be beneficial:{" "}
        </p>
        {isExpanded ? content : `${content.substring(0, previewLength)}...`}
        <button onClick={toggleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
      <div className="exercises__container">
        <h2>Exercises List</h2>
        <select
         className="exercises__tags"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {exercises.map((exercise) => (
          <article key={exercise.id} className="exercises__exercise-card">
            <h4 className="exercises__exercise-name">{exercise.name}</h4>

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
