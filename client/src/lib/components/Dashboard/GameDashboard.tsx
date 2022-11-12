import type { GameInfoProps } from "../../types/components/common";
import { Minesweeper } from "../game";
import Leaderboard from "../leaderboard/Leaderboard";

const Game: React.FC<GameInfoProps> = ({ id }) => {
  return (
    <div>
      {id === "1" ? <Minesweeper rows={8} columns={8} bombs={10} /> : null}
    </div>
  );
};

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  return (
    <span style={{ marginTop: "10px" }}>
      <Game id={id} />
      <Leaderboard />
    </span>
  );
};

export default GameDashboard;
