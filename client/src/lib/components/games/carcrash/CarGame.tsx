import { Button, Center, Container } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import type { DispatchProp } from "react-redux";
import { connect } from "react-redux";

import { getLeaderboard, saveScore } from "lib/services/leaderboard-service";
import { setGameLeaderboard } from "lib/store/slices/leaderboardSlice";
import type { CarGameProps } from "lib/types/components/games/carGame.types";
import { getSessionStorageToken } from "lib/utils/tokenUtils";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";

class CarGame extends React.Component<DispatchProp, CarGameProps> {
  constructor(props: DispatchProp) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      count: 0,
      score: 0,
      redCarLeft: 108,
      blueCarLeft: 108,
      intervalId: setTimeout(() => {}, 1),
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveRedCar = this.moveRedCar.bind(this);
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
    const { intervalId } = this.state;
    clearInterval({ intervalId } as unknown as number);
  }

  gameOver = () => {
    const blueCartopelem = document
      .getElementById("blueCar")
      ?.getElementsByTagName("img")[0];
    if (blueCartopelem) {
      const blueCartop = blueCartopelem.offsetTop;
      const { blueCarLeft, redCarLeft, count, score, intervalId } = this.state;
      if (blueCarLeft === redCarLeft && blueCartop > 510 && blueCartop < 610) {
        clearInterval({ intervalId } as unknown as number);
        this.setState({ play: false, score: count, count: 0, gameOver: true });
        document.removeEventListener("keydown", this.onKeyDown, false);
        this.saveGameScores(score);
      }
    }
  };

  saveGameScores = (gameScore: number) => {
    const token = getSessionStorageToken();
    if (token && token !== "") {
      saveScore(3, gameScore).then(() => {
        getLeaderboard(3).then((leaderboard) => {
          const { dispatch } = this.props;
          dispatch(
            setGameLeaderboard({
              gameId: 3,
              data: leaderboard,
            })
          );
        });
      });
    }
  };

  moveRedCar = (direction: string) => {
    const { redCarLeft } = this.state;
    if (direction === "RIGHT") {
      if (redCarLeft < 378) {
        this.setState({ redCarLeft: redCarLeft + 90 });
      }
    } else if (redCarLeft > 108) {
      this.setState({ redCarLeft: redCarLeft - 90 });
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 39:
        this.moveRedCar("RIGHT");
        break;
      case 37:
        this.moveRedCar("LEFT");
        break;
      default:
        break;
    }
  };

  startGame = () => {
    this.setState({ gameOver: false });
    this.setState({ play: true });
    this.setState({ intervalId: setInterval(this.gameOver, 1) });
  };

  setBlueCarLeft = (value: number) => {
    this.setState({ blueCarLeft: value });
  };

  setCount = (value: number) => {
    this.setState({ count: value });
  };

  render() {
    const { score, gameOver, blueCarLeft, count, redCarLeft, play } =
      this.state;
    const gameScore = score;
    let scoreCard;
    let blueCar;
    let redCar;

    if (gameOver) {
      scoreCard = (
        <ResultsCard score={gameScore} buttonAction={this.startGame} />
      );
    }
    // eslint-disable-next-line no-constant-condition
    if (play) {
      blueCar = (
        <BlueCar
          show={!gameOver}
          blueCarLeft={blueCarLeft}
          setBlueCarLeft={this.setBlueCarLeft}
          count={count}
          setCount={this.setCount}
        />
      );
      redCar = (
        <Container id="redCar" className="redCar">
          <Image
            src="/images/red.png"
            alt="RedCar"
            width={50}
            height={100}
            className={carstyles.redCar}
            style={{ left: redCarLeft as unknown as number }}
          />
        </Container>
      );
    }
    return (
      <Container>
        <Center>
          <Button mt={2} bg="blue.400" color="white" onClick={this.startGame}>
            Play Game
          </Button>
        </Center>
        <Container id="game" h="600px" className={carstyles.game}>
          {blueCar}
          {redCar}
        </Container>
        {scoreCard}
      </Container>
    );
  }
}

export default connect()(CarGame);
