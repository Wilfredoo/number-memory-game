import React from 'react';
import BasicMemory from './Components/BasicMemory';
import SelectiveMemory from './Components/SelectiveMemory';
import Nback from './Components/Nback';
import GameIndex from './Components/GameIndex';
import Levels from './Components/Levels';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className="sans-serif">
				<Route path="/" component={GameIndex} exact />
				<Route path="/levels/:game" component={Levels} exact />
				<Route path="/basic-memory/:level" component={BasicMemory} exact />
				<Route path="/selective-memory/:level" component={SelectiveMemory} exact />
				<Route path="/dual-n-back/:level" component={Nback} exact />
			</div>
		</BrowserRouter>
	);
}

export default App;
