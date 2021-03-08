import React, { useState, useEffect } from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import { wrongAnswers_english, wrongAnswers_german, wrongAnswers_spanish } from '../Helpers/answers';
import getAttributes from '../Helpers/setAttributes';

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
		generateNumber();
	}, []);

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

		const {time} = await getAttributes(level);
		console.log("attribes", time)
		speak({ text: number, voice: voices[voiceIndex] });
		setTimeout(() => {
			setDisabled(false);
		}, time);
	};

	const onSubmit = (values) => {
		let successAnswer;
		let wrongAnswers;
		let voiceIndex;
		switch (lang) {
			case 'DE':
				voiceIndex = 0;
				successAnswer = 'richtig richtig gut';
				wrongAnswers = wrongAnswers_german;
				break;
			case 'EN':
				voiceIndex = 3;
				successAnswer = 'success';
				wrongAnswers = wrongAnswers_english;
				break;
			case 'ES':
				voiceIndex = 5;
				wrongAnswers = wrongAnswers_spanish;
				successAnswer = 'muy bien!';
				break;
		}
		const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

		setDisabled(true);

		if (values.answer === correctAnswer) {
			speak({ text: successAnswer, voice: voices[voiceIndex] });
			setCorrectAnswers((oldArray) => [...oldArray, values.answer]);
		} else {
			speak({ text: wrongAnswer, voice: voices[voiceIndex] });
			setIncorrectAnswers((oldArray) => [...oldArray, values.answer]);
		}
		reset();
		generateNumber();
	};

	const generateNumber = async () => {
		const {digits} = await getAttributes(level);
		console.log("attributes here", digits)
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
