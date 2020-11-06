import React from "react";
import { Link } from "react-router-dom";

function GamesIndex() {
  const games = [{url: "basic-memory", title: "Basic Memory"}, {url: "selective-memory", title: "Selective Memory"}, {url: "dual-n-back", title: "Dual N-Back"}]

  return (
    <div className="componentContainer">
      <h2>Games</h2>
      {games &&
        games.map((data) => {
          return (
            <div>
              <Link to={`/${data.url}/levels`}>
                <p className="games">{data.title}</p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default GamesIndex;
