import React, { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useSpeechSynthesis } from "react-speech-kit";
import { Link } from "react-router-dom";

let correctAnswer;
let correctAnswer2;

function Game({
  match: {
    params: { level },
  },
}) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [oneIsCorrect, setOneIsCorrect] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const [number, setNumber] = useState(null);
  const [number2, setNumber2] = useState(null);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    generateNumber();
    if (level === "4" || level === "5" || level === "6") generateNumber2();
  }, []);

  const setDigits = async () => {
    let digits;
    switch (level) {
      case "1":
        digits = 6;
        break;
      case "2":
        digits = 7;
        break;
      case "3":
        digits = 8;
        break;
      case "4":
        digits = 4;
        break;
      case "5":
        digits = 5;
        break;
      case "6":
        digits = 6;
    }
    return digits;
  };

  const hearNumber = async (number) => {
    let time;
    switch (level) {
      case "1":
        time = 3000;
        break;
      case "2":
        time = 3000;
        break;
      case "3":
        time = 3000;
      case "4":
        time = 4000;
        break;
      case "5":
        time = 4500;
        break;
      case "6":
        time = 5000;
    }

    speak({ text: number });
    if (number2 !== null) speak({ text: number2 });
    setTimeout(() => {
      setDisabled(false);
    }, time);

    if (level === "4" || level === "5" || level === "6") {
      if (Math.random() < 0.5) {
        correctAnswer = correctAnswer2;
        setTimeout(() => {
          setOneIsCorrect("second");
        }, time);
      } else {
        correctAnswer2 = correctAnswer;
        setTimeout(() => {
          setOneIsCorrect("first");
        }, time);
      }
    }
  };

  const onSubmit = (values) => {
    const wrongAnswers = ["failed", "shame", "wrong", "that was very wrong", "sooooo sooo wrong","what is wrong with you", "not good", "bro. can you even hear"]
    const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

    setDisabled(true);
    setOneIsCorrect(null);
    if (values.answer === correctAnswer) {
    speak({ text: "success" });

      setCorrectAnswers((oldArray) => [...oldArray, values.answer]);
    } else {
    speak({ text: wrongAnswer });

      setIncorrectAnswers((oldArray) => [...oldArray, values.answer]);
    }
    reset();
    generateNumber();
    if (level === "4" || level === "5" || level === "6") generateNumber2();
  };

  const generateNumber = async () => {
    const digits = await setDigits();
    const numberArray = [];
    for (let i = 0; i < digits; i++) {
      const digit = Math.floor(Math.random() * 10);
      numberArray.push(digit);
      numberArray.push(" ");
    }
    const numberToHear = numberArray.join("");
    setNumber(numberToHear);
    const numberNoSpaces = numberToHear.replace(/\s/g, "");
    correctAnswer = numberNoSpaces;
  };

  const generateNumber2 = async () => {
    const digits = await setDigits();
    const numberArray = [];
    for (let i = 0; i < digits; i++) {
      const digit = Math.floor(Math.random() * 10);
      numberArray.push(digit);
      numberArray.push(" ");
    }
    const numberToHear = numberArray.join("");
    setNumber2(numberToHear);

    const numberNoSpaces = numberToHear.replace(/\s/g, "");
    correctAnswer2 = numberNoSpaces;
  };

  return (
    <div className="App">
      <Link to={`/`}>
        <p>Back to Levels</p>{" "}
      </Link>
      <h3 className="title">Number Memory Trainer</h3>
      {(level === "1" || level === "2" || level === "3") && (
        <p className="instructions">Just hear the number and type it.</p>
      )}

      {(level === "4" || level === "5" || level === "6") && (
        <p className="instructions">
          Now you are gonna hear two numbers and will be asked to write one of
          them. Pay attention.
        </p>
      )}

      <button
        className="speech"
        disabled={!disabled}
        onClick={() => hearNumber(number)}
      >
        Hear Number
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          name="answer"
          placeholder="what was the number?"
          ref={register({
            required: "Write your answer",
          })}
        />
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </form>
      <p className="error">{errors.answer && errors.answer.message}</p>
      {oneIsCorrect && <p>Please type the {oneIsCorrect} number</p>}
      <div className="results">Results:</div>
      {correctAnswers &&
        correctAnswers.map((data, i) => {
          return (
            <p key={i} className="correct">
              {data} ✓
            </p>
          );
        })}
      {incorrectAnswers &&
        incorrectAnswers.map((data, i) => {
          return (
            <p key={i} className="incorrect">
              {data} X
            </p>
          );
        })}
    </div>
  );
}

export default Game;
