import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PaymentModal({ isOpen, onClose }: Props) {
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
                value={amount}
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value));
                }}
              />
              <Button
                w="100%"
                bg="accent.azure"
                _hover={{ bg: "accent.jeans" }}
                color="white"
                mt={6}
              >
                {type === "recurring"
                  ? "Start recurring flow"
                  : "Start one-time flow"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const [type, setType] = useState<PaymentType>("recurring");
  const [amount, setAmount] = useState<number>();

  return buildComponent();
}

export type PaymentType = "one-time" | "recurring";

export default PaymentModal;
