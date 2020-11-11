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
				<Route path="/levels/:game/:langParam" component={Levels} exact />
				<Route path="/basic-memory/:level/:lang" component={BasicMemory} />
				{/* <Route path="/selective-memory/:level/:lang" component={SelectiveMemory} /> */}
				<Route path="/dual-n-back/:level/:lang" component={Nback} />
			</div>
		</BrowserRouter>
	);
}

export default App;
