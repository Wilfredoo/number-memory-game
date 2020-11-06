import React from 'react';
import Game from './Components/Game';
import Nback from './Components/Nback';
import BasicMemory from './Components/BasicMemory';
import GameIndex from './Components/GameIndex';
import Levels from './Components/Levels';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className="sans-serif">
				<Route path="/" component={GameIndex} exact={true} />
				<Route path="/:game/levels" component={Levels} />
				<Route
              path="/basic-memory/:level"
              component={BasicMemory}
              exact={true}
            />
				
			</div>
		</BrowserRouter>
	);
}

export default App;
