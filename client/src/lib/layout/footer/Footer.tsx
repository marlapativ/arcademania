import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm" color="gray.500">
        © 2022 ArcadeMania
      </Text>
    </Flex>
  );
};

export default Footer;
