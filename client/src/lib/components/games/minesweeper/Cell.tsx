import { useState } from 'react';
import { CellProps, MinesweeperCellValue, MinesweeperGameStatus } from './types';
import styles from "./styles/Cell.module.scss";

const Cell: React.FC<CellProps> = ({
    isHidden,
    value,
    coordinate,
    unhide,
    endGame
}) => {
    const [isCellHidden, setIsCellHidden] = useState(true);
    const cellClick = () => {
        if (value == MinesweeperCellValue.BOMB) {
            endGame();
        }
        else {
            unhide(coordinate)
        }
    }

    return (
        <span onClick={cellClick} className={`${styles.cell}`}>
        </span>
    );
};

export default Cell;