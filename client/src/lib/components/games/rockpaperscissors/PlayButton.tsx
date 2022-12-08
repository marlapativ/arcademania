/* eslint-disable no-nested-ternary */
import { Button, Container } from "@chakra-ui/react";
import type { AnyFunction } from "@chakra-ui/utils";
import Image from "next/image";

import styles from "./styles/RockPaperScissors.module.scss";

interface ButtonProps {
  startPlay?: AnyFunction;
  disable: boolean;
  choice: "paper" | "scissors" | "rock" | undefined;
  result?: boolean;
}

export function PlayButton({
  startPlay,
  disable,
  choice,
  result,
}: ButtonProps) {
  return (
    <Container className={styles.buttonContainer}>
      <Button
        disabled={disable}
        className={
          choice === "paper"
            ? styles.paper
            : choice === "rock"
            ? styles.rock
            : styles.scissors
        }
        onClick={() => {
          if (startPlay) {
            startPlay(choice);
          }
        }}
      >
        <Image
          src={`/images/${choice}.png`}
          alt={`image_${choice}`}
          width={125}
          height={125}
        />
      </Button>
      {result && <span />}
    </Container>
  );
}
