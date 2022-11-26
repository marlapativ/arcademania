import { useToast } from "@chakra-ui/react";
import React from "react";

class ToastMessage extends React.Component<
  { messageTitle: string; messageDesc: string },
  {}
> {
  constructor(props: any) {
    super(props);
    this.getToastMessage = this.getToastMessage.bind(this);
  }

  getToastMessage() {
    const toast = useToast();
    return toast({
      title: this.props.messageTitle,
      description: this.props.messageDesc,
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  }

  render() {
    return this.getToastMessage();
  }
}

export default ToastMessage;
