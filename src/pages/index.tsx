import { Divider, Flex, Text } from "@chakra-ui/react";

function Home() {
  const buildComponent = () => {
    return (
      <Flex w="100vw" h="100vh">
        <Flex w="60%" minH="100%" align={"center"} justify="center">
          <Text
            fontFamily={"Pacifico"}
            fontSize="96px"
            pl={4}
            boxShadow={"-10px -18px rgba(31, 31, 51)"}
          >
            Flow
          </Text>
          <Text
            mt={4}
            ml={10}
            pr={4}
            fontSize="96px"
            boxShadow={"10px 18px rgba(31, 31, 51)"}
          >
            Funds
          </Text>
        </Flex>
        {/* <Divider my='auto' h='60%' w='32px' color='black' orientation="vertical" /> */}
        <Flex w="40%" minH="100%" direction={"column"} overflowY="auto" mx={4}>
          {Array.from(Array(10)).map(profileCard)}
        </Flex>
      </Flex>
    );
  };

  const profileCard = (element: number, index: number) => {
    return (
      <Flex
        key={index}
        borderRadius={"16px"}
        boxShadow="10px 18px 4px 4px rgba(31, 31, 51)"
        border="4px solid rgba(31, 31, 51)"
        h="20%"
        my={4}
        direction="column"
      >
        <Text>Hi</Text>
        <Text>Hi</Text>
        <Text>Hi</Text>
      </Flex>
    );
  };

  return buildComponent();
}

export default Home;
