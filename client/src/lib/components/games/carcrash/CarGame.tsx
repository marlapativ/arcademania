import React from "react";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";
import Image from "next/image";

class CarGame extends React.Component<
  {},
  {
    play: boolean;
    gameOver: boolean;
    result: number;
    count: number;
    score: number;
    redCarLeft: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      result: 0,
      count: 0,
      score: 0,
      redCarLeft: 138,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveRedCar = this.moveRedCar.bind(this);
  }

  componentDidMount() {
    setInterval(this.gameOver, 10);
    document.onkeydown = this.onKeyDown;
  }

  gameOver = () => {
    const blueCar = document.getElementById("blueCar")?.getElementsByTagName('img')[0];
    if (blueCar != null) {
      const blueCartop = blueCar.getBoundingClientRect()["top"];
      const blueCarleft = blueCar.getBoundingClientRect()["left"];
      const redCarleft = this.state.redCarLeft;
      if (blueCarleft === redCarleft && blueCartop > 390 && blueCartop < 510) {
        this.setState({ score: this.state.count });
        this.setState({ count: 0 });
        this.setState({ gameOver: true });
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
    this.setState({ play: true });
    setInterval(this.gameOver, 10);
  };

  render() {
    const gameScore: number = this.state.score as number;
    let scoreCard, blueCar;
    if (this.state.score !== 0) {
      scoreCard = <ResultsCard score={gameScore} />;
    }
    if (this.state.play) {
      blueCar = <BlueCar />;
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
        <div
          id="game"
          className={carstyles.game}
          style={{ display: this.state.gameOver ? "none" : "block" }}
        >
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
