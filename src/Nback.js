import React, { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useSpeechSynthesis } from "react-speech-kit";
import { Link } from "react-router-dom";

let correctAnswersArray = [];

function Nback({
  match: {
    params: { level },
  },
}) {
  const [disabled, setDisabled] = useState(true);
  const [results, setResults] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const [sequence, setSequence] = useState([]);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    generateArrayofNumbers();
  }, []);

  const hearSequence = async (sequence) => {
    reset();

    sequence.forEach((element, index) => {
      setTimeout(function () {
        speak({ text: element });
      }, index * 3000);
    });
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  const onSubmit = (userAnswers) => {
    let resultsArray = [];
    correctAnswersArray.forEach((data, i) => {
      if (data === userAnswers[i]) resultsArray.push("correct");
      else resultsArray.push("incorrect");
    });
    console.log(resultsArray);
    setResults(resultsArray);
  };

  const generateArrayofNumbers = async () => {
    const sequenceArray = [];
    for (let u = 0; u < 10; u++) {
      const numberArray = [];
      for (let i = 0; i < 3; i++) {
        const digit = Math.floor(Math.random() * 10);
        numberArray.push(digit);
        numberArray.push(" ");
      }
      const numberToHear = numberArray.join("");
      sequenceArray.push(numberToHear);
      setSequence(sequenceArray);
      const numberNoSpaces = numberToHear.replace(/\s/g, "");

      correctAnswersArray.push(numberNoSpaces);
    }
  };

  const inputs = sequence.map((data, i) => {
    if (sequence !== null) {
      return (
        <div className="inputDiv">
          {console.log("results here", results[i])}
          <input
            type="number"
            name={`${i}`}
            placeholder={`what was number ${i + 1}?`}
            ref={register({})}
            />
            {results.length !== 0 && results[i] === "correct" && <p>Correctomundo</p>}
            {results.length !== 0 && results[i] === "incorrect" && <p>Not correct!</p>}

        </div>
      );
    }
  });

  return (
    <div className="App">
      <Link to={`/`}>
        <p>Back to Levels</p>
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
        {inputs}
        <button type="submit">Submit</button>
      </form>

      <p className="error">{errors.answer && errors.answer.message}</p>
    </div>
  );
}

export default Nback;
