import { Flex, Text, Image, Button } from "@chakra-ui/react";

function Home() {
  const buildComponent = () => {
    return (
      <Flex w="100vw" h="100vh">
        <Flex
          w="60%"
          minH="100%"
          align={"center"}
          justify="center"
          direction={"column"}
        >
          <Flex w="100%" justify={"center"}>
            <Text
              fontFamily={"Pacifico"}
              fontSize="96px"
              pl={4}
              color="accent.azure"
              borderRadius={"8px"}
              boxShadow={"-10px -18px rgba(31, 31, 51)"}
            >
              Flow
            </Text>
            <Text
              mt={4}
              ml={10}
              pr={4}
              fontSize="96px"
              borderRadius={"8px"}
              boxShadow={"10px 18px #0A84FF"}
            >
              Funds
            </Text>
          </Flex>
          <Button
            mt="15%"
            bg="accent.azure"
            _hover={{ bg: "accent.jeans" }}
            color="white"
            w="25%"
            h="54px"
            fontWeight={"700"}
            fontSize="24px"
          >
            Raise fund
          </Button>
        </Flex>
        {/* <Divider my='auto' h='60%' w='32px' color='black' orientation="vertical" /> */}
        <Flex w="40%" minH="100%" direction={"column"} overflowY="auto" px={4}>
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
        boxShadow="4px 8px 2px 2px rgba(31, 31, 51)"
        border="4px solid rgba(31, 31, 51)"
        my={4}
        p={4}
        direction="row"
        gap={6}
        minH={"25%"}
      >
        <Flex
          h="100%"
          w="25%"
          border={"1px solid rgba(31, 31, 51)"}
          borderRadius="4px"
          align="center"
          justify={"center"}
          direction="column"
        >
          <Text>NFT</Text>
          <Text>Image here</Text>
        </Flex>
        <Flex direction="column" gap={2} w="75%">
          <Text fontSize="24px" fontWeight="bold">
            Title goes here
          </Text>
          <Text fontSize="18px">Description goes here</Text>
          <Flex mt="auto" w="100%">
            <Button ml="auto" bg="accent.azure" _hover={{ bg: "accent.jeans" }}>
              <Text color="white">Flow fund</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return buildComponent();
}

export default Home;
