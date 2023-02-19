import {
  Button,
  Flex,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { NFT } from "src/utils/types";
import { useArcanaAuth } from "src/utils/useArcanaAuth";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { GraphQLClient } from "graphql-request"
import { GetActiveStreams, GetActiveStreamsQuery } from "src/generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nft: NFT
}

function PaymentModal({ isOpen, onClose, nft }: Props) {
  const buildComponent = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Flex direction={"column"} align="center">
              <Text fontFamily={"Pacifico"} fontSize="32px">
                Flow Fund
              </Text>
              <Text mt={4}>
                Enter the details below to start funding this campaign
              </Text>
              <RadioGroup
                mt={2}
                onChange={(v) => {
                  setType(v as PaymentType);
                }}
                value={type}
              >
                <Flex gap={4}>
                  <Radio value="recurring">Recurring</Radio>
                  <Radio value="one-time">One-time</Radio>
                </Flex>
              </RadioGroup>
              <Input
                mt={4}
                type='number'
                placeholder={
                  type === "recurring"
                    ? "Enter the flow rate (per second)"
                    : "Enter lumpsum amount"
                }
                value={flowRate}
                onChange={(e) => {
                  setFlowRate(e.target.value);
                }}
              />
              <Button
                w="100%"
                isLoading={loading}
                bg="accent.azure"
                _hover={{ bg: "accent.jeans" }}
                color="white"
                mt={6}
                onClick={async() => {
                  await startFlow(nft)
                }}
              >
                {type === "recurring"
                  ? "Start recurring flow"
                  : "Start one-time flow"}
              </Button>

              {txHash && <Link mt={4} href={`https://mumbai.polygonscan.com/tx/${txHash}`} isExternal>Transaction Link</Link>}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const [type, setType] = useState<PaymentType>("recurring");
  const [flowRate, setFlowRate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()

  const { user, provider } = useArcanaAuth()

  const startFlow = async (nft: NFT) => {
    if (!user || !flowRate) return
    setLoading(true)
    setTxHash(undefined)
    console.log(nft)

    const ethersProvider = new ethers.providers.Web3Provider(provider);

    const sf = await Framework.create({
      chainId: 80001,
      provider: ethersProvider,
    });

    const daix = await sf.loadSuperToken("fDAIx");

    const params = {
      sender: user.address,
      receiver: "0x0a3c7EcD69604e924027f642dB14403e8cbb2e2e", //tradeable cashflow address
      flowRate,
      userData: ethers.utils.hexZeroPad(ethers.utils.hexlify(parseInt(nft.id)), 32),
      superToken: daix.address,
    }

    console.log(params)

    const graphQLClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai');
    const variables = {
      sender: user.address,
      receiver: '0x0a3c7EcD69604e924027f642dB14403e8cbb2e2e'
    }
    const query: GetActiveStreamsQuery = await graphQLClient.request(GetActiveStreams, variables)
    console.log({streams: query.streams, variables})
    const createFlowOperation = query.streams.length > 0 ? sf.cfaV1.updateFlow(params) : sf.cfaV1.createFlow(params)
  
    const tx1 = await createFlowOperation.forwarderPopulatedPromise;
    const tx2 = await createFlowOperation.populateTransactionPromise;
    console.log(tx1)
    console.log(tx2)

    const hash = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: user.address,
          to: (tx1 ?? tx2).to,
          value: "0",
          data: (tx1 ?? tx2).data,
        },
      ],
    });

    console.log(hash)
    setLoading(false)
    setTxHash(hash as string)
  };

  return buildComponent();
}

export type PaymentType = "one-time" | "recurring";

export default PaymentModal;
