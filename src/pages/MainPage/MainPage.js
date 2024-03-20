import OpenAI from "openai";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [randomQuote, setRandomQuote] = useState("");
  //Advice
  const [question, setQuestion] = useState(null);
  const [advice, setAdvice] = useState([]);

  //Get random quote of the day
  const getRandomQuote = async () => {
    try {
      const response = await axios.get("https://stoic.tekloon.net/stoic-quote");
      console.log(response);
      setRandomQuote(response.data);
    } catch (error) {}
    // console.log(randomQuote);
  };

  //Get advice from ChatGPT
  const getAdvice = async (e) => {
    e.preventDefault();
    console.log(question);
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
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
    } catch (error) {}
  };

  useEffect(() => {
    if (randomQuote === "") {
      getRandomQuote();
    }
  }, [advice]); //dependency list

  if (randomQuote === "") {
    return <div>Loading page...</div>;
  }

  return (
    <div className="App">
      <section>
        <h2>"{randomQuote.quote}"</h2>
        <p>-{randomQuote.author}</p>
      </section>
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
