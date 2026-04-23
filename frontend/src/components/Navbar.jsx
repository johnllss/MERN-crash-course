import React from 'react';
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { Link } from 'react-router-dom';

import { LuSquarePlus } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={useColorModeValue("blue.500", "blue.300")}
          // bgGradient={"linear(to-r, teal.400, blue.500)"}
          // bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <LuSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}</Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;