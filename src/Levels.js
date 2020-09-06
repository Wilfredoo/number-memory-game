import React from "react";
import { Link } from "react-router-dom";

function Levels() {
  const levelsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="App">
      <h3 className="title">Number Memory Trainer</h3>
      <h2>Levels</h2>
      {levelsArray &&
        levelsArray.map((data) => {
          return (
            <div>
              {data <= 6 &&
              <Link to={`/game/${data}`}>
                
                <p>Level {data}</p>
              </Link>}
              {data >= 7 &&
              <Link to={`/nback/${data}`}>
                
                <p>Level {data}</p>
              </Link>}
            </div>
          );
        })}
    </div>
  );
}

export default Levels;
