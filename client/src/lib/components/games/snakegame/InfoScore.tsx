import { score } from "lib/types/components/games/games.common";
import { useEffect, useState } from "react";

export default function InfoScore(props: score) {
  const [bestScore, setBestScore] = useState<number>(0);
  useEffect(() => {
    if (props.score > bestScore) {
      setBestScore(props.score);
    }
  }, [props.score]);
  return (
    <div className="opacity-30 p-2">
      <p className="font-bold">Current Score: {props.score}</p>
      <p className="font-bold">Best Score: {bestScore}</p>
    </div>
  );
}
