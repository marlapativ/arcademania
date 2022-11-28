import React from "react";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";
import Image from "next/image";
import { Container } from "@chakra-ui/react";
import { carGameProps } from "lib/types/components/games/carGame.types";
// import CarGameStartModal from "./carGameStartModal";
import ModalComponent from "lib/components/common/modal/modal";

class CarGame extends React.Component<{}, carGameProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      count: 0,
      score: 0,
      redCarLeft: 108,
      blueCarLeft: 108,
      blueCarTop: 5,
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
    clearInterval(this.state.intervalId);
  }

  gameOver = () => {
    const blueCartopelem = document
      .getElementById("blueCar")
      ?.getElementsByTagName("img")[0]!;
    if (blueCartopelem) {
      const blueCartop = blueCartopelem.offsetTop;
      const blueCarleft = this.state.blueCarLeft;
      const redCarleft = this.state.redCarLeft;
      if (blueCarleft === redCarleft && blueCartop > 350 && blueCartop < 510) {
        this.setState({ play: false });
        this.setState({ score: this.state.count });
        this.setState({ count: 0 });
        this.setState({ gameOver: true });
        document.removeEventListener("keydown", this.onKeyDown, false);
        clearInterval(this.state.intervalId);
      }
    }
  };

  moveRedCar = (direction: string) => {
    if (direction === "RIGHT") {
      if (this.state.redCarLeft < 378) {
        this.setState({ redCarLeft: this.state.redCarLeft + 90 });
      }
    } else {
      if (this.state.redCarLeft > 108) {
        this.setState({ redCarLeft: this.state.redCarLeft - 90 });
      }
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
  setBlueCarTop = (value: number) => {
    this.setState({ blueCarTop: value });
  };
  setCount = (value: number) => {
    this.setState({ count: value });
  };

  render() {
    const gameScore: number = this.state.score as number;
    let scoreCard, blueCar;
    if (this.state.gameOver) {
      scoreCard = <ResultsCard score={gameScore} buttonAction={this.startGame}/>;
    } else {
      scoreCard = <></>;
    }
    if (this.state.play) {
      blueCar = (
        <BlueCar
          show={!this.state.gameOver}
          blueCarLeft={this.state.blueCarLeft}
          setBlueCarLeft={this.setBlueCarLeft}
          count={this.state.count}
          setCount={this.setCount}
        />
      );
    }
    return (
      <Container>
        <ModalComponent
        modalHeader={"start the Car Game"}
        modalCotent={""}
        actionButtonText={"Start Game"}
        buttonAction={this.startGame}
      />
        <Container
          id="game"
          className={carstyles.game}
          style={{ display: "block" }}
        >
          {blueCar}
          <Container id="redCar" className="redCar">
            <Image
              src="/images/red.png"
              alt="RedCar"
              width={50}
              height={100}
              className={carstyles.redCar}
              style={{ left: this.state.redCarLeft }}
            />
          </Container>
        </Container>
        {scoreCard}
      </Container>
    );
  }
}

export default CarGame;
