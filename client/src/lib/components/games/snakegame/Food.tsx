import snakeGameStyles from "./styles/snakeGame.module.scss"
interface FoodProps {
  dot: number[];
}

export default function Food(props: FoodProps) {
  const styleFood = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };
  return <div className={snakeGameStyles.food} style={styleFood}></div>;
}
