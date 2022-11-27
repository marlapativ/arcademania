import React from "react";
import Image from "next/image";
import blueCarStyles from "./styles/blueCar.module.scss";
import { blueCar } from "lib/types/components/games/carGame.types";
import { useEffect } from "react";

const BlueCar: React.FC<blueCar> = ({
  show,
  blueCarLeft,
  setBlueCarLeft,
  count,
  setCount,
}) => {
  const onAnimationIteration = () => {
    const carlefts = [138, 231, 324, 417];
    let random = Math.floor(Math.random() * carlefts.length);
    setBlueCarLeft(carlefts[random]);
    setCount(count + 1);
  };

  if (show) {
    return (
      <div
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
      </div>
    );
  } else {
    return <></>;
  }
};

export default BlueCar;
