import OpenAI from "openai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../consts";
import axios from "axios";

function ExercisePage() {
  const { exerciseId } = useParams();

  //Int scenario
  const [exercise, setExercise] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [scenarioAnswer, setScenarioAnswer] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

console.log(exerciseId)

  //get
  const getExercise = async () => {
    try {
      const requestUrl = `${baseURL}/exercises/${exerciseId}`;
      console.log(requestUrl)
      const result = await axios.get(requestUrl);
      const fetchedExercise = result.data;
      console.log(fetchedExercise)
      if (!exercise) {
        setExercise(fetchedExercise);
      }
    } catch (error) {
      console.log(error);
    }
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

  if(!exercise){
    return <p>Loading...</p>
  }

  return (
    <>
      <section>
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
        <h4>Benefits</h4>
        <p>{exercise.benefits}</p>
        <h4>Instructions</h4>
        <p>{exercise.instructions}</p>
      </section>
      <section>
        <div>
          <h2>Interactive Scenario</h2>
          <button type="click" onClick={getScenario}>
            GET SCENARIO
          </button>
          <h3>{scenario}</h3>
          <form onSubmit={getScenarioFeedback}>
            <input
              type="text"
              onChange={(e) => setScenarioAnswer(e.target.value)}
            ></input>
            <button type="submit">get feedback</button>
          </form>
          <h3>Feedback</h3>
          <p>{scenarioFeedback}</p>
        </div>
      </section>
    </>
  );
}

export default ExercisePage;
