import "./ExercisesPage.scss";
import { useState, useEffect } from "react";
import { baseURL } from "../../consts";
import axios from "axios";
import { Link } from "react-router-dom";

function ExercisesPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentLines = [
    "1. Bouncing Back - Stoicism teaches you to accept things you can't change, which helps you deal with tough times better, making you less stressed and worried.",
    "2. Handling Feelings Better - Stoicism helps you think about your feelings and why you have them, which means you can manage them better. This is good for making decisions and getting along with others.",
    "3. Seeing the Big Picture - Stoic exercises help you look at life from a higher viewpoint, making small annoyances seem less important. This helps you focus on what really matters.",
    "4. Living in the Moment - Stoicism encourages enjoying the here and now, not fretting about the past or future. This can make everyday life more enjoyable.",
    "5. Growing Stronger - Stoicism pushes you to look at yourself honestly and control your desires, leading to personal growth and better behavior.",
    "6. Less Negative Vibes - Stoicism teaches that getting upset over things you can't control or comparing yourself to others is a waste of time. This can make you feel less angry, jealous, or upset.",
    "7. Enjoying Simplicity - Stoicism likes the idea of a simple life without chasing after money or stuff all the time. This can make you happier with what you have.",
    "8. Being Kind - While Stoicism talks a lot about personal strength, it also says we should be good to others and help out where we can. This makes for better friendships and community.",
    "9. Thinking Clearly - Regular Stoic practice helps you think straight, especially when things get complicated, helping you make good choices.",
    "10. Feeling Good About Life - With its mix of toughness, smarts, and good vibes, Stoicism can lead to a deep sense of happiness and satisfaction in life.",
  ];
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
        {isExpanded ? (
          contentLines.map((line, index) => {
            // Split the line into the header and the rest of the text
            const splitIndex = line.indexOf("-");
            const header = line.substring(0, splitIndex).trim();
            const text = line.substring(splitIndex + 1).trim();

            return (
              <p key={index}>
                <strong>{header}</strong> {text}
              </p>
            );
          })
        ) : (
          // Just showing the first line as a preview
          <p>
            <strong>
              {contentLines[0]
                .substring(0, contentLines[0].indexOf("-"))
                .trim()}
            </strong>
            {contentLines[0].substring(contentLines[0].indexOf("-") + 1).trim()}
          </p>
        )}
        <button onClick={toggleReadMore} className="exercises__description-toggle">
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
