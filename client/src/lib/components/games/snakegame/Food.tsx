import Image from "next/image";

import type { FoodProps } from "lib/types/components/games/snakeGame.types";

import snakeGameStyles from "./styles/snakeGame.module.scss";

const Food: React.FC<FoodProps> = ({ coordinates }) => {
  const styleFood = {
    left: `${coordinates[0]}%`,
    top: `${coordinates[1]}%`,
  };
  return (
    <div className={snakeGameStyles.food} style={styleFood}>
      <Image layout="fill" src="/images/frog.png" alt="Food" />
    </div>
  );
};

export default Food;
