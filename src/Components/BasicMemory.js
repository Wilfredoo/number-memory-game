import React, { useState, useEffect } from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';

let correctAnswer;

function BasicMemory({
	match: {
		params: { level, lang },
	},
}) {
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const [incorrectAnswers, setIncorrectAnswers] = useState([]);
	const { handleSubmit, register, errors, reset } = useForm();
	const [number, setNumber] = useState(null);
	const { speak, voices } = useSpeechSynthesis();

	useEffect(() => {
		console.log("lang", lang)
		generateNumber();
	}, []);

	const setVoiceIndex = async () => {
		let voiceIndex;
		switch (level) {
			case 'DE':
				voiceIndex = 0;
				break;
			case 'EN':
				voiceIndex = 3;
				break;
			case 'ES':
				voiceIndex = 5;
				break;
		}
		return voiceIndex;
	};

	const setDigits = async () => {
		let digits;
		switch (level) {
			case '1':
				digits = 5;
				break;
			case '2':
				digits = 6;
				break;
			case '3':
				digits = 7;
				break;
			case '4':
				digits = 8;
				break;
			case '5':
				digits = 9;
				break;
			case '6':
				digits = 10;
				break;
			case '7':
				digits = 11;
				break;
			case '8':
				digits = 12;
				break;
			case '9':
				digits = 13;
				break;
			case '10':
				digits = 14;
				break;
		}
		return digits;
	};

	const hearNumber = async (number) => {
		let voiceIndex;
		switch (lang) {
			case 'DE':
				voiceIndex = 0;
				break;
			case 'EN':
				voiceIndex = 3;
				break;
			case 'ES':
				voiceIndex = 5;
				break;
		}


		let time;
		switch (level) {
			case '1':
				time = 2500;
				break;
			case '2':
				time = 3000;
				break;
			case '3':
				time = 3000;
			case '4':
				time = 5000;
				break;
			case '5':
				time = 5500;
				break;
			case '6':
				time = 6000;
				break;
			case '7':
				time = 6000;
				break;
			case '8':
				time = 6500;
				break;
			case '9':
				time = 6500;
				break;
			case '10':
				time = 7000;
				break;
		}
		console.log("voice index", voiceIndex)
		speak({ text: number, voice: voices[voiceIndex] });
		setTimeout(() => {
			setDisabled(false);
		}, time);
	};

	const onSubmit = (values) => {
		const wrongAnswers = [
			'failed',
			'shame',
			'wrong',
			'that was very wrong',
			'really?',
			'what is wrong with you',
			'not good',
			'bro. can you even hear',
			'what the hell',
			'dissapointing',
			'you must be kidding me now',
			'unrealistically wrong',
			'at least you tried',
			'Some stars are born, some stars are made. You are neither of them'
		];

		const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

		setDisabled(true);
		if (values.answer === correctAnswer) {
			speak({ text: 'success' });
			setCorrectAnswers((oldArray) => [...oldArray, values.answer]);
		} else {
			speak({ text: wrongAnswer });

			setIncorrectAnswers((oldArray) => [...oldArray, values.answer]);
		}
		reset();
		generateNumber();
	};

	const generateNumber = async () => {
		const digits = await setDigits();
		const numberArray = [];
		for (let i = 0; i < digits; i++) {
			const digit = Math.floor(Math.random() * 10);
			numberArray.push(digit);
			numberArray.push(' ');
		}
		const numberToHear = numberArray.join('');
		setNumber(numberToHear);
		const numberNoSpaces = numberToHear.replace(/\s/g, '');
		correctAnswer = numberNoSpaces;
	};

	return (
		<div className="App">
			<Link to={`/levels/basic-memory/${lang}`}>
				<p>Back to Levels</p>{' '}
			</Link>
			<h3 className="title">Number Memory Trainer</h3>
			<p className="instructions">Just hear the number and type it.</p>
			<button className="speech" disabled={!disabled} onClick={() => hearNumber(number)}>
				Hear Number
			</button>
			{!disabled && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="number"
						name="answer"
						placeholder="what was the number?"
						ref={register({
							required: 'Write your answer',
						})}
					/>
					<button disabled={disabled} type="submit">
						Submit
					</button>
				</form>
			)}
			<p className="error">{errors.answer && errors.answer.message}</p>
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

export default BasicMemory;
