import React from "react";
import ModalComponent from "lib/components/common/modal/Modal";
import { resultCardProps } from "lib/types/components/games/carGame.types";

const ResultsCard: React.FC<resultCardProps> = ({ score, buttonAction }) => {
  return (
    <ModalComponent
    modalHeader={"Game Over"}
    modalCotent={"Your score is "+score}
    actionButtonText={"ReStart"}
    buttonAction={buttonAction}
  />
  );
};

export default ResultsCard;
