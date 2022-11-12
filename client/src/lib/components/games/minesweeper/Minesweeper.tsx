import _ from 'lodash';
import { MinesweeperCellData, MinesweeperGameProps, MinesweeperCellValue, MinesweeperMessage, MinesweeperCoordindate, MinesweeperGameStatus } from './types';
import styles from "./styles/Minesweeper.module.scss";
import { useEffect, useState } from 'react';
import Cell from './Cell';

const Minesweeper: React.FC<MinesweeperGameProps> = ({ rows, columns, bombs }) => {
    const [game, setGame] = useState(createGame(rows, columns, bombs));
    const [score, setScore] = useState(0);
    const [showGameMessage, setShowGameMessage] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        document.documentElement.style.setProperty("--rowNum", rows.toString());
        document.documentElement.style.setProperty("--colNum", columns.toString());
    }, [rows, columns]);

    const playAgain = () => {
        setGame(createGame(rows, columns, bombs));
        setScore(0);
        setShowGameMessage(false);
        setWin(false);
    }

    const unhideCell = (coordinate: MinesweeperCoordindate) => {

    }

    const endGame = () => {
        setWin(false);
        setShowGameMessage(true);
    };

    return (
        <div className={`${styles.gamecontainer}`} >
            <GameStatusMessage show={showGameMessage} win={win} playAgain={playAgain} score={score} />
            <div className={`${styles.boardcontainer} ${showGameMessage ? styles.blur : ''}`}>
                {
                    game.map((eachRow, rowIndex) =>
                        eachRow.map((eachColumn, columnIndex) => {
                            const key = rowIndex * columns + columnIndex;
                            const coordinate: MinesweeperCoordindate = { x: rowIndex, y: columnIndex };
                            return (
                                <Cell
                                    key={key}
                                    coordinate={coordinate}
                                    unhide={unhideCell}
                                    endGame={endGame}
                                    value={eachColumn.value}
                                    isHidden={eachColumn.hidden}
                                />
                            );
                        })
                    )}
            </div>
        </div >
    );
}

const GameStatusMessage: React.FC<MinesweeperMessage> = ({ show, win, playAgain, score }) => {
    const className = `${styles.container} ${show ? styles.show : styles.hide}`;
    const message = `You ${win ? 'win!' : 'lose'}! Score: ${score}`;
    return (
        <div className={className}>
            <div>{message}</div>
            <button className={styles.button} onClick={playAgain}>
                Play Again
            </button>
        </div>
    );
}

const createGame = (rows: number, columns: number, bombs: number): MinesweeperCellData[][] => {
    const game: MinesweeperCellData[][] = Array.from(Array(rows), () => new Array(columns).fill({
        hidden: false,
        value: MinesweeperCellValue.VALID
    }))

    setBombsRandomly(game, bombs);
    return game;
}

const setBombsRandomly = (game: MinesweeperCellData[][], bombs: number): void => {
    const rows = game.length, columns = game[0].length;
    const max = rows * columns;
    const numbers = new Set();
    while (bombs > 0) {
        const index = _.random(max - 1, false);
        if (numbers.has(index)) {
            continue;
        }
        const row = Math.floor(index / columns);
        game[row][index % columns] = {
            hidden: true,
            value: MinesweeperCellValue.BOMB
        }
        bombs--;
        numbers.add(index);
    }
}

export default Minesweeper;