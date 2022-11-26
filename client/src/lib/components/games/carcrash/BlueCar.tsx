import React, { useTransition } from "react";
import Image from "next/image";
import blueCarStyles from "./styles/blueCar.module.scss";

class BlueCar extends React.Component<
  {},
  {
    show: boolean;
    blueCarLeft: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      blueCarLeft: 138,
    };
  }

  onAnimationIteration = () => {
    const carlefts = [138, 231, 324, 417];
    let random = Math.floor(Math.random() * carlefts.length);
    this.setState({blueCarLeft: carlefts[random]});
  };

  componentDidMount(): void {
    this.setState({ show: true });
  }

  render() {
    return (
      <div
        id="blueCar"
        className="blueCar"
        onAnimationIteration={this.onAnimationIteration}
      >
        <Image
          src="/images/blue.png"
          alt="BlueCar"
          width={50}
          height={100}
          className={blueCarStyles.blueCar}
          style={{ left: this.state.blueCarLeft }}
        />
      </div>
    );
  }
}

export default BlueCar;
