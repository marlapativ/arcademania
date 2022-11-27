import React from "react";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";
import Image from "next/image";
import { carGameProps } from "lib/types/components/games/carGame.types";

class CarGame extends React.Component<{}, carGameProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      count: 0,
      score: 0,
      redCarLeft: 138,
      blueCarLeft: 138,
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
      if (this.state.redCarLeft < 372) {
        this.setState({ redCarLeft: this.state.redCarLeft + 93 });
      }
    } else {
      if (this.state.redCarLeft > 138) {
        this.setState({ redCarLeft: this.state.redCarLeft - 93 });
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
      scoreCard = <ResultsCard score={gameScore} />;
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
      <div>
        <button
          id="start"
          className={carstyles.startBtn}
          onClick={this.startGame}
        >
          Start
        </button>
        <div id="game" className={carstyles.game} style={{ display: "block" }}>
          {blueCar}
          <div id="redCar" className="redCar">
            <Image
              src="/images/red.png"
              alt="RedCar"
              width={50}
              height={100}
              className={carstyles.redCar}
              style={{ left: this.state.redCarLeft }}
            />
          </div>
        </div>
        {scoreCard}
      </div>
    );
  }
}

export default CarGame;
