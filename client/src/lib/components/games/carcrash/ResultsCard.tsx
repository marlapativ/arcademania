import React from "react";
import { score } from "lib/types/components/games/games.common";

const ResultsCard: React.FC<score> = ({ score }) => {
  return (
    <div id="result" className="resultCard">
      <h1>Game Over</h1>
      <p id="score" className="score">
        Your score is {score}
      </p>
      <button id="btn" className="restartBtn">
        restart
      </button>
    </div>
  );
};

export default ResultsCard;
