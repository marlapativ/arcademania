import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalDataProps } from "lib/types/components/common";
import React from "react";

const ModalComponent: React.FC<ModalDataProps> = ({
  isOpen,
  onClose,
  modalHeader,
  modalCotent,
  actionButtonText,
  buttonAction,
}) => {
  const setActionButton = () => {
    buttonAction();
    onClose();
  }
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>{modalCotent}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={setActionButton}>
            {actionButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalComponent;
