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
  const [showInput0, setShowInput0] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const [showInput5, setShowInput5] = useState(false);
  const [showInput6, setShowInput6] = useState(false);
  const [showInput7, setShowInput7] = useState(false);
  const [showInput8, setShowInput8] = useState(false);
  const [showInput9, setShowInput9] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(null);

  const { handleSubmit, register, errors, reset } = useForm();
  const [sequence, setSequence] = useState([]);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    generateArrayofNumbers();
  }, []);

  const setDigits = async () => {
    let digits;
    switch (level) {
      case "7":
        digits = 3;
        break;
      case "8":
        digits = 4;
        break;
      case "9":
        digits = 5;
        break;
      case "10":
        digits = 3;
        break;
      case "11":
        digits = 4;
        break;
      case "12":
        digits = 5;
        break;
    }
    return digits;
  };

  const hearSequence = async (sequence) => {
    setCorrectAnswers(null);
    let time;
    let delay;

    switch (level) {
      case "7":
        time = 4000;
        delay = 2000;
        break;
      case "8":
        time = 4500;
        delay = 2000;
        break;
      case "9":
        time = 4500;
        delay = 2000;
        break;
      case "10":
        time = 4000;
        delay = 5000;
        break;
      case "11":
        time = 4000;
        delay = 5500;
        break;
      case "12":
        time = 4000;
        delay = 6000;
        break;
    }

    const inputSets = [
      setShowInput0,
      setShowInput1,
      setShowInput2,
      setShowInput3,
      setShowInput4,
      setShowInput5,
      setShowInput6,
      setShowInput7,
      setShowInput8,
      setShowInput9,
    ];

    inputSets.forEach((data, i) => {
      data(false);
    });

    inputSets.forEach((data, i) => {
      setTimeout(() => {
        data(true);
      }, time * i + time + delay);
    });
    reset();

    sequence.forEach((element, index) => {
      setTimeout(function () {
        speak({ text: element });
      }, index * time);
    });
    setTimeout(() => {
      setDisabled(false);
    }, time);
  };

  const onSubmit = (userAnswers) => {
    setDisabled(true);
    setCorrectAnswers(null);
    let correctCounter = 0;

    correctAnswersArray.forEach((data, i) => {
      if (data === userAnswers[i]) correctCounter = correctCounter + 1;
    });

    let message = "";
    if (correctCounter <= 8) message = "wow. you really suck";
    if (correctCounter === 9) message = "not bad";
    if (correctCounter === 10) message = "ah. we got a champ here";

    speak({ text: message });

    setCorrectAnswers(correctCounter);
  };

  const generateArrayofNumbers = async () => {
    const digits = await setDigits();

    const sequenceArray = [];
    for (let u = 0; u < 10; u++) {
      const numberArray = [];
      for (let i = 0; i < digits; i++) {
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
    const inputIndexes = [
      showInput0,
      showInput1,
      showInput2,
      showInput3,
      showInput4,
      showInput5,
      showInput6,
      showInput7,
      showInput8,
      showInput9,
    ];
    if (sequence !== null) {
      return (
        <div className="inputDiv">
          {inputIndexes[i] && (
            <input
              type="number"
              name={`${i}`}
              placeholder={`what was number ${i + 1}?`}
              ref={register({})}
            />
          )}
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
        {showInput9 && <button type="submit">Submit</button>}
      </form>
      {correctAnswers && <span>Correct: {correctAnswers} out of 10</span>}
      {correctAnswers === 0 && <p>Completely wrong</p>}

      <p className="error">{errors.answer && errors.answer.message}</p>
    </div>
  );
}

export default Nback;
