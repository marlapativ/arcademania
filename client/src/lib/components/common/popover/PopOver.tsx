import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";

import type { PopOverProps } from "lib/types/components/common";

const PopOver: React.FC<PopOverProps> = ({
  popOverHeader,
  popOverCotent,
  triggerButtonText,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>{triggerButtonText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{popOverHeader}</PopoverHeader>
        <PopoverBody>{popOverCotent}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
