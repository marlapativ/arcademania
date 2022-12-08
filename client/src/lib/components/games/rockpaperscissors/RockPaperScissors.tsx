/* eslint-disable react/jsx-no-bind */
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { PlayButton } from "./PlayButton";
import styles from "./styles/RockPaperScissors.module.scss";

const RockPaperScissors = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [result, setResult] = useState<"YOU WIN" | "YOU LOSE" | "DRAW">();
  const [playerChoice, setPlayerChoice] = useState<
    "paper" | "scissors" | "rock"
  >();
  const [systemChoice, setSystemChoice] = useState<
    "paper" | "scissors" | "rock" | null
  >(null);
  const possibleResults = ["paper", "scissors", "rock"];

  function startPlay(choice: "paper" | "scissors" | "rock") {
    setIsPlaying(true);
    setPlayerChoice(choice);
    setTimeout(() => {
      const randomResult = Math.floor(Math.random() * possibleResults.length);
      if (possibleResults[randomResult] === "paper") {
        setSystemChoice("paper");
      } else if (possibleResults[randomResult] === "scissors") {
        setSystemChoice("scissors");
      } else {
        setSystemChoice("rock");
      }
    }, 1000);
  }

  function reset() {
    setIsPlaying(false);
    setSystemChoice(null);
    setisDone(false);
    setResult("DRAW");
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function verifyResults() {
    switch (playerChoice) {
      case "paper":
        if (systemChoice === "rock") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "scissors") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;
      case "scissors":
        if (systemChoice === "paper") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "rock") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;
      case "rock":
        if (systemChoice === "scissors") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "paper") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;

      default:
        break;
    }

    setisDone(true);
  }

  useEffect(() => {
    if (systemChoice) {
      setTimeout(() => {
        verifyResults();
      }, 1000);
    }
  }, [systemChoice, verifyResults]);

  return (
    <Container className={styles.container}>
      {!isPlaying ? (
        <Container className={styles.pickContainer}>
          <PlayButton
            disable={isPlaying}
            startPlay={startPlay}
            choice="paper"
          />
          <PlayButton
            disable={isPlaying}
            startPlay={startPlay}
            choice="scissors"
          />
          <PlayButton disable={isPlaying} startPlay={startPlay} choice="rock" />
        </Container>
      ) : (
        <Container className={styles.gamingWrapper}>
          <Container className={styles.gamingContainer}>
            <Container className={styles.playerChoiceContainer}>
              <PlayButton
                disable={isPlaying}
                choice={playerChoice}
                result={result === "YOU WIN"}
              />
              <p>You Picked</p>
            </Container>

            {isDone && (
              <Container className={styles.resultContainer}>
                <p>{result}</p>
                <button type="button" onClick={reset}>
                  PLAY AGAIN
                </button>
              </Container>
            )}

            <Container className={styles.systemChoiceContainer}>
              {!systemChoice ? (
                <span />
              ) : (
                <PlayButton
                  disable={isPlaying}
                  choice={systemChoice}
                  result={result === "YOU LOSE"}
                />
              )}
              <p>System Picked</p>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default RockPaperScissors;
