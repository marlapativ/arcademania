import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import { ModalDataProps } from 'lib/types/components/common';
import React from 'react';

const AlertComponent: React.FC<ModalDataProps> = ({
    modalHeader,
    modalCotent,
    actionButtonText,
    buttonAction,
  }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const setActionButton = () => {
    buttonAction();
    onClose();
  }
  return (
    <AlertDialog closeOnOverlayClick={true} isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}>
<AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {modalHeader}
            </AlertDialogHeader>

            <AlertDialogBody>
             {modalCotent}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={setActionButton} ml={3}>
                {actionButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      );
    };
    export default AlertComponent;
    