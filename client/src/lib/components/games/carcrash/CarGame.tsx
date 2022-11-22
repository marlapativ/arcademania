import React from "react";

import BlueCar from "./BlueCar";
import RedCar from "./RedCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";

const initialState = {
  play: false,
  gameOver: false,
  direction: "RIGHT",
  result: 0,
  count: 0,
  score: 0,
};

class CarGame extends React.Component<
  {},
  {
    play: boolean;
    gameOver: boolean;
    direction: string;
    result: number;
    count: number;
    score: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      direction: "RIGHT",
      result: 0,
      count: 0,
      score: 0,
    };
    this.setGameOver = this.setGameOver.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.animation = this.animation.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  setGameOver(status: boolean) {
    this.setState({ gameOver: status });
  }

  componentDidMount() {
    setInterval(this.gameOver, 10);
    document.onkeydown = this.onKeyDown;
  }

  gameOver() {
    const blueCar = document.getElementById("blueCar");
    const redCar = document.getElementById("redCar");
    if (blueCar != null && redCar != null) {
      const blueCartop = blueCar.getBoundingClientRect()["top"];
      const blueCarleft = blueCar.getBoundingClientRect()["left"];
      const redCarleft = redCar.getBoundingClientRect()["left"];
      if (blueCarleft === redCarleft && blueCartop > 340 && blueCartop < 450) {
        this.setState({ score: this.state.count });
        this.setState({ count: 0 });
      }
    }
  }
  onKeyDown(e: any) {
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
    }
  }

  animation() {
    let random = Math.floor(Math.random() * 5) * 93;
    if (random == 0 || random == 1) {
      random = 93;
    }
    let blueCar = document.getElementById("blueCar");
    if (blueCar != null) blueCar.style.left = random + "px";
    this.setState({ count: this.state.count + 1 });
  }

  startGame() {
    this.setState({ play: true });
    let blueCar = document.getElementById("blueCar");
    if (blueCar != null) {
      blueCar.addEventListener("animationiteration", this.animation);
    }
    setInterval(this.gameOver, 10);
  }

  render() {
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
          if({this.state.play}){<BlueCar />}
          <RedCar />
        </div>
        if({this.state.score} != 0){<ResultsCard score={this.state.score} />}
      </div>
    );
  }
}

export default CarGame;
