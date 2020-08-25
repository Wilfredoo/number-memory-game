import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useSpeechSynthesis } from "react-speech-kit";
import { Link } from "react-router-dom";

let correctAnswer;

function Nback({
  match: {
    params: { level },
  },
}) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [oneIsCorrect, setOneIsCorrect] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const [sequence, setSequence] = useState(null);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    generateArrayofNumbers();
  }, []);

  const hearSequence = async (sequence) => {
    console.log("sequence to hear", sequence);
    sequence.forEach((element) => {
      speak({ text: element });
    });
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  const onSubmit = (values) => {
    setDisabled(true);
    setOneIsCorrect(null);
    console.log("what is correct", correctAnswer);
    if (values.answer === correctAnswer) {
      setCorrectAnswers((oldArray) => [...oldArray, values.answer]);
    } else {
      setIncorrectAnswers((oldArray) => [...oldArray, values.answer]);
    }
    reset();
  };

  const generateArrayofNumbers = async () => {
    const sequenceArray = [];
    const numberArray = [];
    for (let u = 0; u < 10; u++) {
      for (let i = 0; i < 6; i++) {
        const digit = Math.floor(Math.random() * 10);
        numberArray.push(digit);
        numberArray.push(" ");
      }
      const numberToHear = numberArray.join("");
      sequenceArray.push(numberToHear);
      console.log("sequence array", sequenceArray);
      setSequence(sequenceArray);
      const numberNoSpaces = numberToHear.replace(/\s/g, "");
      correctAnswer = numberNoSpaces;
    }
  };

  return (
    <div className="App">
      <Link to={`/`}>
        <p>Back to Levels</p>{" "}
      </Link>
      <h3 className="title">Number Memory Trainer</h3>
      <p>
        Things get hardcore now. You are gonna hear a sequence of numbers. Type
        'em.
      </p>

      <button
        className="speech"
        disabled={!disabled}
        onClick={() => hearSequence(sequence)}
      >
        Start Sequence
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

export default Nback;
