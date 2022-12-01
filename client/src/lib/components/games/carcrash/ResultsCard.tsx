import type React from "react";

import ModalComponent from "lib/components/common/modal/Modal";
import type { ResultCardProps } from "lib/types/components/games/carGame.types";

const ResultsCard: React.FC<ResultCardProps> = ({ score, buttonAction }) => {
  return (
    <ModalComponent
      modalHeader="Game Over"
      modalCotent={`Your score is ${score}`}
      actionButtonText="ReStart"
      buttonAction={buttonAction}
    />
  );
};

export default ResultsCard;
