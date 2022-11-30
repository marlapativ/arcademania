import { Container } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import ModalComponent from "lib/components/common/modal/Modal";
import type { CarGameProps } from "lib/types/components/games/carGame.types";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";

class CarGame extends React.Component<unknown, CarGameProps> {
  constructor(props: CarGameProps) {
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
      const { blueCarLeft } = this.state;
      const { redCarLeft } = this.state;
      const { count } = this.state;
      if (blueCarLeft === redCarLeft && blueCartop > 350 && blueCartop < 510) {
        this.setState({ play: false });
        this.setState({ score: count });
        this.setState({ count: 0 });
        this.setState({ gameOver: true });
        const { intervalId } = this.state;
        document.removeEventListener("keydown", this.onKeyDown, false);
        clearInterval({ intervalId } as unknown as number);
      }
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

  onKeyDown = (e: any) => {
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
    const { score } = this.state;
    const gameScore = score;
    let scoreCard;
    let blueCar;
    const { gameOver } = this.state;
    const { blueCarLeft } = this.state;
    const { count } = this.state;
    const { redCarLeft } = this.state;
    const { play } = this.state;

    if (gameOver && !play) {
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
    }
    return (
      <Container>
        {/* <GameStatusMessage show={true} playAgain={this.startGame} score={this.state.score} win={true} key={1} /> */}

        <Container
          id="game"
          className={carstyles.game}
          style={{ display: "block" }}
        >
          <ModalComponent
            modalHeader="start the Car Game"
            modalCotent=""
            actionButtonText="Start Game"
            buttonAction={this.startGame}
          />
          {blueCar}
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
        </Container>
        {scoreCard}
      </Container>
    );
  }
}

export default CarGame;
