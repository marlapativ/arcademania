import { Flex, Menu, Link, MenuButton,MenuList, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { NavItemProps } from '../../../types/components/common'

const NavItem: React.FC<NavItemProps> = ({navSize, title, icon, active, children}) => {
    return(
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement='right'>
                <Link
                backgroundColor={active? "AEC8CA" : "none"}
                p={navSize == "small" ? "23px" : "5px"}
                borderRadius={8}
                _hover= {{textDecor: 'none', background: '#AEC8CA'}}
                w={navSize == "large" ? "100%" : "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active? "#82AAAD" : "gray.500"}/>
                            <Text ml={5} display={navSize == "small" ? "none": "flex"} transition="0.5s ease-out">
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>

                    </MenuList>
                </Link>
            </Menu>
        </Flex>
    )
}

export default NavItem;