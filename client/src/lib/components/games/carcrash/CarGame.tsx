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

class CarGame extends React.Component {
  state = initialState;

  setGameOver = (status: boolean) => {
    this.state.gameOver = status;
  };

  componentDidMount(): void {
    setInterval(this.gameOver, 10);
    document.onkeydown = this.onKeyDown;
  }

  gameOver = () => {
    let blueCar = document.getElementById("blueCar");
    let redCar = document.getElementById("redCar");
    if (blueCar != null && redCar != null) {
      let blueCartop = blueCar.getBoundingClientRect()["top"];
      let blueCarleft = blueCar.getBoundingClientRect()["left"];
      let redCarleft = redCar.getBoundingClientRect()["left"];
      if (blueCarleft === redCarleft && blueCartop > 340 && blueCartop < 450) {
        this.state.score = this.state.count;
        this.state.count = 0;
      }
    }
  };
  onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
    }
  };

  animation = () => {
    let random = Math.floor(Math.random() * 5) * 93;
    if (random == 0 || random == 1) {
      random = 93;
    }
    let blueCar = document.getElementById("blueCar");
    if (blueCar != null) blueCar.style.left = random + "px";
    this.state.count++;
  };

  startGame = () => {
    this.state.play = true;
    let blueCar = document.getElementById("blueCar");
    if (blueCar != null) {
      blueCar.addEventListener("animationiteration", this.animation);
    }
    setInterval(this.gameOver, 10);
  };

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
