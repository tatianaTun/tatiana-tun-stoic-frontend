import OpenAI from "openai";
import React, { useState, useEffect } from "react";

function MainPage() {
  //Advice
  const [question, setQuestion] = useState(null);
  const [advice, setAdvice] = useState("");



  //Get advice from ChatGPT
  const getAdvice = async (e) => {
    e.preventDefault();
    console.log(question);
    const openai = new OpenAI({
      apiKey: "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", //process.env.REACT_APP_OPENAI_API_KEY
      dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${question}.Please reply me with an array. The first array item is a relevant quote from stoic philosophy that would be a good fit answer to my situation or question. Second array item should be the quote's author. The third item is explanation of the quote and it's application to the my situation or question. Please provide some mental support.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices[0].message.content);
    const returnedAdvice = JSON.parse(
      chatCompletion.choices[0].message.content
    ); //need to parse the response from json into a js
    setAdvice(returnedAdvice);
  };



  //useEffect
  useEffect(() => {}, [advice]); //dependency list

  // if (!answer) {
  //   return <div>Loading page...</div>;
  // }

  return (
    <div className="App">
      <section>
      <form onSubmit={getAdvice}>
        <input
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        ></input>
        <button type="submit">ask</button>
      </form>
      <div>
        <h2>Answer</h2>
        <h3>"{advice[0]}"</h3>
        <p>-{advice[1]}</p>
        <p>{advice[2]}</p>
      </div>
      </section>

    </div>
  );
}

export default MainPage;