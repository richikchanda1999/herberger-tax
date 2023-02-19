import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/theme";
import { ProvideAuth } from "src/utils/useArcanaAuth";
import { AuthProvider, CHAIN } from "@arcana/auth";

const auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ADDRESS!, {
  theme: "light",
  network: "testnet",
  position: 'left',
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: `https://wispy-aged-river.matic-testnet.discover.quiknode.pro//`,
  }
  // chainConfig: {
  //   chainId: CHAIN.POLYGON_MAINNET,
  //   rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID}`,
  // }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={auth}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  );
}
