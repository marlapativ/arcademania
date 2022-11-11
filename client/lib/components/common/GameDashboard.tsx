import { GameInfoProps } from "../../types/components/common";
import { Minesweeper } from "../game";
import Leaderboard from "../leaderboard/Leaderboard";

const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
    return (
        <span style={{marginTop: '10px'}}>
            <Game id={id} />
            <Leaderboard />
        </span>
    );
};


const Game: React.FC<GameInfoProps> = ({ id }) => {
    return (
        <>
            {id == '1' ? <Minesweeper rows={8} columns={8} bombs={10}></Minesweeper> : null}
        </>
    )
}


export default GameDashboard;