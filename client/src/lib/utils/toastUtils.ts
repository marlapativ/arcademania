import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const raiseError = (message: string) => {
  toast({ title: message, status: "error" });
};
