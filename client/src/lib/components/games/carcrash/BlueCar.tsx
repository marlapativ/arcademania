import React from "react";
import Image from "next/image";
import { Container } from "@chakra-ui/react";
import blueCarStyles from "./styles/blueCar.module.scss";
import { blueCar } from "lib/types/components/games/carGame.types";

const BlueCar: React.FC<blueCar> = ({
  show,
  blueCarLeft,
  setBlueCarLeft,
  count,
  setCount,
}) => {
  const onAnimationIteration = () => {
    const carlefts = [108, 198, 288, 378];
    let random = Math.floor(Math.random() * carlefts.length);
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
  } else {
    return <></>;
  }
};

export default BlueCar;
