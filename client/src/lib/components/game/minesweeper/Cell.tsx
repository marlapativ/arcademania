// import { useState } from "react";
import styles from "./styles/Cell.module.scss";
import type { CellProps } from "./types";
import { MinesweeperCellValue } from "./types";

const Cell: React.FC<CellProps> = ({
  //   isHidden,
  value,
  coordinate,
  unhide,
  endGame,
}) => {
  //   const [isCellHidden, setIsCellHidden] = useState(true);
  const cellClick = () => {
    if (value === MinesweeperCellValue.BOMB) {
      endGame();
    } else {
      unhide(coordinate);
    }
  };

  return <div onClick={cellClick} className={`${styles.cell}`} />;
};

export default Cell;
