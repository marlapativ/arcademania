import { useToast } from "@chakra-ui/react";
import React from "react";

const ToastMessage = (messageTitle: string, messageDesc: string) => {
  const toast = useToast();
  const toastIdRef = React.useRef() || "";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeAll = () => {
    toast.closeAll();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addToast = () => {
    return toast({
      title: messageTitle,
      description: messageDesc,
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };
};

export default ToastMessage;
