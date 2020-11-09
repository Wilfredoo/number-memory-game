import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Levels({
	match: {
		params: { game, langParam },
	},
}) {
	const levelsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const languages = ['EN', 'ES', 'DE']; 
	const [langState, setLangState] = useState(langParam)
	console.log("lang param", langParam)

	return (
		<div className="App">
			<h3 className="title">Number Memory Trainer</h3>
			<h2>Levels</h2>
			{levelsArray.map((level) => {
				return (
					<div>
						<Link to={`/${game}/${level}/${langState}`}>
							<p>Level {level}</p>
						</Link>
					</div>
				);
			})}
			{languages.map((lang) => {
				return (
					<>
					{console.log("lang lang lang", langParam)}
						<input type="radio" id={lang} name="language" value={lang} onChange={e => setLangState(e.target.value)} defaultChecked={lang === langParam ? true : false} />
						<label for={lang}>{lang}</label>
					</>
				);
			})}
		</div>
	);
}

export default Levels;
