import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { formatAddress } from "src/utils/formatters";
import { useArcanaAuth } from "src/utils/useArcanaAuth";

function Navbar() {
  const buildComponent = () => {
    return (
      <Flex w="100%" h="96px" px="16px">
        <Box ml="auto" />
        {!isLoggedIn && (
          <Button
            isLoading={loading}
            my="auto"
            mr="16px"
            onClick={onConnectClick}
          >
            Connect Wallet
          </Button>
        )}
        {isLoggedIn && (
          <Flex
            my="auto"
            direction={"row"}
            bg="gray.100"
            py={2}
            px={4}
            borderRadius="4px"
          >
            <Flex w='100%' align={'center'} gap={4}>
              <Image src={user?.picture} boxSize={'3rem'} borderRadius='3xl' />
              <Flex direction={"column"}>
                <Text>{user?.name}</Text>
                <Flex>
                  <Text fontSize="14px" color="gray">
                    {formatAddress(user?.address)}
                  </Text>
                  <Text fontSize="14px" color="gray" ml={1}>
                    - {provider.chainId}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  };

  const { user, connect, isLoggedIn, loading, provider } = useArcanaAuth();

  const onConnect = () => {
    console.log("connected");
  };

  const onConnectClick = async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    provider.on("connect", onConnect);
    return () => {
      provider.removeListener("connect", onConnect);
    };
  }, [provider]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return buildComponent();
}

export default Navbar;
