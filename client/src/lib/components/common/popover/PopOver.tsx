import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useColorModeValue,
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
        <Button color={useColorModeValue("gray.600", "white")}>
          {triggerButtonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow color={useColorModeValue("gray.600", "white")} />
        <PopoverCloseButton />
        <PopoverHeader color={useColorModeValue("gray.600", "white")}>
          {popOverHeader}
        </PopoverHeader>
        <PopoverBody color={useColorModeValue("gray.600", "white")}>
          {popOverCotent}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
