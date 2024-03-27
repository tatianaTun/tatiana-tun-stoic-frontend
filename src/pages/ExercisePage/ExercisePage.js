import "./ExercisePage.scss";
import OpenAI from "openai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../consts";
import axios from "axios";

function ExercisePage() {
  const { exerciseId } = useParams();

  //Int scenario
  const [exercise, setExercise] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [scenarioAnswer, setScenarioAnswer] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  console.log(exerciseId);

  //get
  const getExercise = async () => {
    try {
      const requestUrl = `${baseURL}/exercises/${exerciseId}`;
      console.log(requestUrl);
      const result = await axios.get(requestUrl);
      const fetchedExercise = result.data;
      console.log(fetchedExercise);
      if (!exercise) {
        setExercise(fetchedExercise);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle visibility
  const showScenario = async () => {
    setIsVisible(!isVisible);
  };

  //get int scenario and get feedback

  const getScenario = async (e) => {
    e.preventDefault();

    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `The exercise is ${exercise}.Please give back an interactive scenario where a person can apply the exercise without specifying how the exercise should be apllied. Add a short question about how the exercise the person just practiced can be applied in this scenario without hinting on it's positive effects. Please write as you are communication with a person. Specify the scenario is to practice this exercise.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices[0].message.content);
    const returnedScenario = chatCompletion.choices[0].message.content; //need to parse the response from json into a js
    setScenario(returnedScenario);
  };

  const getScenarioFeedback = async (e) => {
    e.preventDefault();

    const openai = new OpenAI({
      apiKey: "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", //process.env.REACT_APP_OPENAI_API_KEY
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `The scenario is ${scenario}. The user's answer is ${scenarioAnswer}. Please analize the answer and return feedback as you are communicating in person. Keep in mind that this is all related to Stoicism philosophy. Reply without questions as the user will not be able to reply you.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices[0].message.content);
    const returnedScenarioFeedback = chatCompletion.choices[0].message.content; //need to parse the response from json into a js
    setScenarioFeedback(returnedScenarioFeedback);
  };

  useEffect(() => {
    getExercise();
  }, [scenario]);

  if (!exercise) {
    return <p>Loading...</p>;
  }

  return (
    <div className="exercise">
      <section className="exercise__details">
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
        <h3>Benefits</h3>
        <p>{exercise.benefits}</p>
        <h3>Instructions</h3>
        <p>{exercise.instructions}</p>
        <p className="exercise__next-steps">
          Once you are done with the exercise, click the button below and you
          will be able to try implementing the exercise in a real-life{" "}
          <strong>interactive scenario</strong>!
        </p>
        <button  className="exercise__done-button" onClick={showScenario}>DONE</button>
      </section>
      {isVisible && (
        <section className="exercise__scenario">
          <p>Now that you have practiced the exercise, you might have a better understanding of it's benefits.</p>
          <button type="click" className="exercise__scenario-button" onClick={getScenario}>
           <strong></strong> GET SCENARIO
          </button>
          <p>{scenario}</p>
          <form onSubmit={getScenarioFeedback}>
            <input
              type="text"
              onChange={(e) => setScenarioAnswer(e.target.value)}
            ></input>
            <button type="submit" className="exercise__feedback-button">SHARE</button>
          </form>
          {/* <h3>Feedback</h3> */}
          <p className="exercise__feedback">{scenarioFeedback}</p>
        </section>
      )}
    </div>
  );
}

export default ExercisePage;
