import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "lib/components/common/modal/modal";
import { AnyFunction } from "@chakra-ui/utils";
import React from "react";

const CarGameStartModal = (startGameFunction: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div onLoad={onOpen}>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalHeader={"start the Car Game"}
        modalCotent={""}
        actionButtonText={"Start Game"}
        buttonAction={startGameFunction}
      />
    </div>
  );
};

export default CarGameStartModal;
