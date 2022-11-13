import { useState } from "react";

import type { CellProps } from "lib/types/components/games/minesweeper.types";
import { MinesweeperCellValue } from "lib/types/components/games/minesweeper.types";

import styles from "./Cell.module.scss";

const MinesweeperCell: React.FC<CellProps> = ({
  isHidden,
  value,
  coordinate,
  unhide,
  endGame,
}) => {
  const [isCellHidden, setIsCellHidden] = useState(isHidden);
  const cellClick = () => {
    if (!isCellHidden) {
      setIsCellHidden(true);
    }
    if (value === MinesweeperCellValue.BOMB) {
      endGame();
    } else {
      unhide(coordinate);
    }
  };

  return <span onClick={cellClick} className={`${styles.cell}`} />;
};

export default MinesweeperCell;
