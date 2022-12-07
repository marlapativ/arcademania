import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const raiseError = (message: Error | string) => {
  const title = message instanceof Error ? message.message : message;
  toast({ title, position: "bottom-right", status: "error", duration: 2000 });
};
