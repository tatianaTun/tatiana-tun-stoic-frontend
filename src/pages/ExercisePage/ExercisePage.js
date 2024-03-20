import OpenAI from "openai";
import { useState, useEffect } from "react";

function ExercisePage() {
  //Int scenario
  const [exercise, setExercise] = useState("Early morning reflection");
  const [prompt, setPrompt] = useState("");
  const [scenario, setScenario] = useState(null);
  const [scenarioAnswer, setScenarioAnswer] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  //get int scenario and get feedback

  const getScenario = async (e) => {
    e.preventDefault();

    const openai = new OpenAI({
      apiKey: "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", //process.env.REACT_APP_OPENAI_API_KEY
      dangerouslyAllowBrowser: true,
    });

    setPrompt(
      `My exercise is ${exercise}.Please give me an interactive scenario where I can apply apply the exercise without specifying how the exercise should be apllied. Add a short question about how the exercise the person just practiced can be applied in this scenario without hinting on it's positive effects`
    );

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
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
          content: `The scenario is ${prompt}. The usr's answer is ${scenarioAnswer}. Please analize the answer and return feedback`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices[0].message.content);
    const returnedScenarioFeedback = chatCompletion.choices[0].message.content; //need to parse the response from json into a js
    setScenarioFeedback(returnedScenarioFeedback);
  };

  return (
    <>
      {" "}
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
            <button type="submit">ask</button>
          </form>
          <h3>Feedback</h3>
          <p>{scenarioFeedback}</p>
        </div>
      </section>
    </>
  );
}

export default ExercisePage;
