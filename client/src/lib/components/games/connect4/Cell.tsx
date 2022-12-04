import { Container } from "@chakra-ui/react";
import { memo } from "react";

import type { Disk } from "lib/types/components/games/connect4.types";

import connect4Styles from "./styles/connect4.module.scss";

const Cell = memo(function CellRaw({
  Disk,
  size,
}: {
  Disk: Disk;
  size?: number;
}) {
  let cellColor;
  if (Disk === "red") cellColor = connect4Styles.Cellred;
  else if (Disk === "yellow") cellColor = connect4Styles.Cellyellow;
  return (
    <Container
      borderRadius={size}
      width={size}
      height={size}
      margin={0}
      className={`${connect4Styles.Cell} ${cellColor}`}
    />
  );
});

export default Cell;
