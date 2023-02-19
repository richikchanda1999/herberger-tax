import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NFT } from "src/utils/types";
import { GraphQLClient } from "graphql-request"
import { GetFlowRate, GetFlowRateQuery } from "src/generated/graphql";

interface Props {
    nft: NFT
    index: number
    setSelectedNFT: (nft: NFT) => void
}

function NFTCard({ nft, index, setSelectedNFT }: Props) {
    const buildComponent = () => {
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
                minH={"35%"}
            >
                <Flex
                    h="100%"
                    w="25%"
                    borderRadius="4px"
                    direction="column"
                >
                    <Image src={nft.image} />
                </Flex>
                <Flex direction="column" gap={2} w="75%">
                    <Text fontSize="24px" fontWeight="bold">
                        {nft.name}
                    </Text>
                    <Text fontSize="18px">{nft.description}</Text>
                    <Flex mt="auto" w="100%">
                        <Button
                            ml="auto"
                            bg="accent.azure"
                            _hover={{ bg: "accent.jeans" }}
                            onClick={() => {
                                setSelectedNFT(nft);
                            }}
                        >
                            <Text color="white">Flow fund</Text>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        );
    }

    const [flowRate, setFlowRate] = useState<string>()

    const getFlowRate = async () => {
        console.log('Calculatig flow rate...')
        const graphQLClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai');
        const variables = {
            sender: '0x0a3c7EcD69604e924027f642dB14403e8cbb2e2e',
            receiver: nft.owner,
        }
        console.log(variables)
        const query: GetFlowRateQuery = await graphQLClient.request(GetFlowRate, variables)
        console.log(query)

        const now = Date.now()
        for(const stream of query.streams) {
            console.log(stream)
            // stream.streamedUntilUpdatedAt + ((Math.floor(now / 1000)) - stream.updatedAtTimestamp) * stream.currentFlowRate
        }
    }

    useEffect(() => {
        getFlowRate()
    }, [])

    return buildComponent()
}

export default NFTCard;