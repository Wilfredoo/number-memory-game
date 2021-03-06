// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import { useForm } from 'react-hook-form';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { Link } from 'react-router-dom';

// function SelectiveMemory({
// 	match: {
// 		params: { level },
// 	},
// }) {
// 	const [correctAnswers, setCorrectAnswers] = useState([]);
// 	const [disabled, setDisabled] = useState(true);
// 	const [oneIsCorrect, setOneIsCorrect] = useState(null);
// 	const [incorrectAnswers, setIncorrectAnswers] = useState([]);
// 	const { handleSubmit, register, errors, reset } = useForm();
// 	const [number, setNumber] = useState(null);
// 	const [number2, setNumber2] = useState(null);
// 	const { speak } = useSpeechSynthesis();

// 	useEffect(() => {
// 		setDigitsAndTime()
// 	}, []);

// 	const setDigitsAndTime = async () => {
// 		let digits;
// 		switch (level) {
// 			case '1':
// 				digits = 7;
// 				time = 3000;
// 				break;
// 			case '2':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 			case '3':
// 				digits = 9;
// 				time = 3000;
// 				break;
// 			case '4':
// 				digits = 6;
// 				time = 3000;
// 				break;
// 			case '5':
// 				digits = 7;
// 				time = 3000;
// 				break;
// 			case '6':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 			case '7':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 			case '8':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 			case '9':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 			case '10':
// 				digits = 8;
// 				time = 3000;
// 				break;
// 		}
// 		return digits, time;
// 	};

// 	const hearNumber = async (number) => {
// 		const number_one = await generateNumber();
// 		const number_two = await generateNumber();
// 		console.log('num 1 -->', number_one);
// 		console.log('num 2 -->', number_one);
// 		setNumber(number_one);
// 		setNumber2(number_two);

// 		let time;

// 		speak({ text: number });
// 		if (number2 !== null) speak({ text: number2 });
// 		setTimeout(() => {
// 			setDisabled(false);
// 		}, time);

// 		if (Math.random() < 0.5) {
// 			correctAnswer = correctAnswer2;
// 			setTimeout(() => {
// 				setOneIsCorrect('second');
// 			}, time);
// 		} else {
// 			correctAnswer2 = correctAnswer;
// 			setTimeout(() => {
// 				setOneIsCorrect('first');
// 			}, time);
// 		}
// 	};

// 	const onSubmit = (values) => {
// 		const wrongAnswers = [
// 			'failed',
// 			'shame',
// 			'wrong',
// 			'that was very wrong',
// 			'really?',
// 			'what is wrong with you',
// 			'not good',
// 			'bro. can you even hear',
// 			'what. the. hell',
// 		];
// 		const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

// 		setDisabled(true);
// 		setOneIsCorrect(null);
// 		if (values.answer === correctAnswer) {
// 			speak({ text: 'success' });
// 			setCorrectAnswers((oldArray) => [...oldArray, values.answer]);
// 		} else {
// 			speak({ text: wrongAnswer });
// 			setIncorrectAnswers((oldArray) => [...oldArray, values.answer]);
// 		}
// 		reset();
// 		generateNumber();
// 	};

// 	const generateNumber = async () => {
// 		const digits = await setDigits();
// 		console.log('digits', digits);
// 		const numberArray = [];
// 		for (let i = 0; i < digits; i++) {
// 			const digit = Math.floor(Math.random() * 10);
// 			numberArray.push(digit);
// 			numberArray.push(' ');
// 		}
// 		const numberToHear = numberArray.join('');
// 		return numberToHear;
// 		// setNumber2(numberToHear);
// 		// setNumber(numberToHear);
// 		// const numberNoSpaces = numberToHear.replace(/\s/g, '');
// 		// setCorrectAnswers(numberNoSpaces)
// 	};

// 	return (
// 		<div className="App">
// 			<Link to={`/`}>
// 				<p>Back to Levels</p>{' '}
// 			</Link>
// 			<h3 className="title">Number Memory Trainer</h3>
// 			<p className="instructions">
// 				Now you are gonna hear two numbers and will be asked to write one of them. Pay attention.
// 			</p>
// 			<button className="speech" disabled={!disabled} onClick={() => hearNumber(number)}>
// 				Hear Number
// 			</button>
// 			{!disabled && (
// 				<form onSubmit={handleSubmit(onSubmit)}>
// 					<input
// 						type="number"
// 						name="answer"
// 						placeholder="what was the number?"
// 						ref={register({
// 							required: 'Write your answer',
// 						})}
// 					/>
// 					<button disabled={disabled} type="submit">
// 						Submit
// 					</button>
// 				</form>
// 			)}
// 			<p className="error">{errors.answer && errors.answer.message}</p>
// 			{oneIsCorrect && <p>Please type the {oneIsCorrect} number</p>}
// 			{correctAnswers &&
// 				correctAnswers.map((data, i) => {
// 					return (
// 						<p key={i} className="correct">
// 							{data} ✓
// 						</p>
// 					);
// 				})}
// 			{incorrectAnswers &&
// 				incorrectAnswers.map((data, i) => {
// 					return (
// 						<p key={i} className="incorrect">
// 							{data} X
// 						</p>
// 					);
// 				})}
// 		</div>
// 	);
// }

// export default SelectiveMemory;
