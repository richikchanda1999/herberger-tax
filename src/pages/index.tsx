import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import MintNFTModal from "src/modals/MintNFTModal";
import PaymentModal from "src/modals/PaymentModal";
import { Network, Alchemy } from "alchemy-sdk";
import { NFT } from "src/utils/types";
import NFTCard from "src/components/NFTCard";

function Home() {
  const buildComponent = () => {
    return (
      <Flex w="100vw" h="100vh" direction={"column"}>
        <Navbar />
        <Flex w="100%" h='100%'>
          <Flex
            w="55%"
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
              onClick={() => setIsNFTModalOpen(true)}
            >
              Raise fund
            </Button>
          </Flex>
          {/* <Divider my='auto' h='60%' w='32px' color='black' orientation="vertical" /> */}
          <Flex
            w="45%"
            minH="100%"
            maxH="calc(100vh - 96px)"
            direction={"column"}
            overflowY="auto"
            px={4}
          >
            {nfts.map((nft, index) => {
              return <NFTCard nft={nft} index={index} key={index} setSelectedNFT={setSelectedNFT} />
            })}
            {nfts.length === 0 && <Flex w='100%' h='100%' justify={'center'} align='center'><Text textAlign={'center'}>There are no fundraisers to fund, yet!</Text></Flex>}
          </Flex>
        </Flex>
        <PaymentModal
          isOpen={selectedNFT !== undefined}
          onClose={() => setSelectedNFT(undefined)}
          nft={selectedNFT!}
        />
        <MintNFTModal
          isOpen={isNFTModalOpen}
          onClose={() => setIsNFTModalOpen(false)}
        />
      </Flex>
    );
  };

  const [isNFTModalOpen, setIsNFTModalOpen] = useState<boolean>(false);

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT>();

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
  };
  
  const alchemy = new Alchemy(settings);

  const fetchNFTs = async () => {
    const address = '0x0a3c7EcD69604e924027f642dB14403e8cbb2e2e'
    const nfts = await alchemy.nft.getNftsForContract(address);
    
    const _nfts: NFT[] = []
    for(const nft of nfts.nfts) {
      const raw = nft.tokenUri?.raw
      if(raw) {
        const decode1 = Buffer.from(raw.split(',')[1], 'base64').toString()
        const json = JSON.parse(decode1)

        _nfts.push({
          id: nft.tokenId,
          name: json.name,
          description: json.description,
          image: json.image,
          owner: nft.contract.address,
        })
      }
    }

    setNfts(_nfts)
  }

  useEffect(() => {
    fetchNFTs()
  }, [])

  return buildComponent();
}

export default Home;
