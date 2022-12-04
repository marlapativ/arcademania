import { Container } from "@chakra-ui/react";
import { memo } from "react";

import type { Connect4GameColumnProps } from "lib/types/components/games/connect4.types";

import Cell from "./Cell";
import connect4Styles from "./styles/connect4.module.scss";

const ColumnRaw = ({ column, onClick }: Connect4GameColumnProps) => {
  return (
    <Container className={connect4Styles.Column} onClick={onClick}>
      {column.map((Disk, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={i} Disk={Disk} />
      ))}
    </Container>
  );
};
const checkProps = (
  prevProps: Connect4GameColumnProps,
  nextProps: Connect4GameColumnProps
) => {
  for (let i = 0; i < prevProps.column.length; i += 1) {
    if (prevProps.column[i] !== nextProps.column[i]) return false;
  }
  return true;
};
const Column = memo(ColumnRaw, checkProps);
export default Column;
