import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm" color="gray.500">
        <Link href="http://localhost:3000/" isExternal rel="noopener noreferrer">
        http://localhost:3000/
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
