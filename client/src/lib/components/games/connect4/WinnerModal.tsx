import { Button, Container } from "@chakra-ui/react";

import type { Player } from "lib/types/components/games/connect4.types";

import Cell from "./Cell";
import connect4Styles from "./styles/connect4.module.scss";

const WinnerModal = ({
  winner,
  clickFunction,
}: {
  winner: Player;
  clickFunction: (player: Player) => void;
}) => {
  return (
    <Container className={connect4Styles.Overlay}>
      <Container className={connect4Styles.Modal}>
        <h1>
          <Cell Disk={winner} size={20} />
          <span>{winner} wins!</span>
        </h1>
        <Button
          onClick={() => clickFunction(winner === "red" ? "yellow" : "red")}
        >
          Play Again
        </Button>
      </Container>
    </Container>
  );
};

export default WinnerModal;
