import React from "react";
import Levels from "./Levels";
import Game from "./Game";
import Nback from "./Nback";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="sans-serif">
        <Route path="/" component={Levels} exact={true} />
        <Route path="/game/:level" component={Game} />
        <Route path="/nback/:level" component={Nback} />

      </div>
    </BrowserRouter>
  );
}

export default App;
