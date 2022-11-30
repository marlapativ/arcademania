import { Container } from "@chakra-ui/react";
import Image from "next/image";
import type React from "react";

import type { BlueCar } from "lib/types/components/games/carGame.types";

import blueCarStyles from "./styles/blueCar.module.scss";

const BlueCarComponent: React.FC<BlueCar> = ({
  show,
  blueCarLeft,
  setBlueCarLeft,
  count,
  setCount,
}) => {
  const onAnimationIteration = () => {
    const carlefts = [108, 198, 288, 378];
    const random = Math.floor(Math.random() * carlefts.length);
    setBlueCarLeft(carlefts[random]);
    setCount(count + 1);
  };

  if (show) {
    return (
      <Container
        id="blueCar"
        className="blueCar"
        onAnimationIteration={onAnimationIteration}
      >
        <Image
          src="/images/blue.png"
          alt="BlueCar"
          width={50}
          height={100}
          className={blueCarStyles.blueCar}
          style={{ left: blueCarLeft }}
        />
      </Container>
    );
  }
  return <Container />;
};

export default BlueCarComponent;
