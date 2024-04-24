import React, { useState } from "react";
import { quizData, correctAnswers } from "../utils/data";
import Questiontimer from "./Questiontimer";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectAnswer = (selectedAnswer) => {
    const updatedAnswer = [...userAnswer, selectedAnswer];
    console.log("All Answers:", updatedAnswer);
    setUserAnswer(updatedAnswer);

    if (selectedAnswer === correctAnswers[quizData[indexQuestion].id]) {
      setScore(score + 1);
    }

    if (indexQuestion < quizData.length - 1) {
      setIndexQuestion(indexQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const shuffleAnswers = (answers) => {
    const shuffled = answers.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  return (
    <div>
      {!quizCompleted ? (
        <div id="quiz">
          <div id="question">
            <Questiontimer
              timeOut={10000}
              onTimeOut={() => handleSelectAnswer("Time End")}
            />
            <p>{quizData[indexQuestion].text}</p>
            <ul id="answers">
              {shuffleAnswers(quizData[indexQuestion].answers).map((answer) => (
                <li key={answer} className="answer">
                  <button onClick={() => handleSelectAnswer(answer)}>
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div id="summary">
          <img src="/quiz-complete.png" alt="Complete Logo" />
          <ul id="answers">
            <li className="answer">
              <h1 style={{ textAlign: "center" }}>
                Your Score {Math.ceil((score / 7) * 100)}
              </h1>
            </li>
          </ul>
          <h2>All Your Answers:</h2>
          <ul id="answers">
            {userAnswer.map((answer, index) => (
              <li key={index} className="answer">
                <button
                  disabled
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    cursor: "default",
                  }}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
