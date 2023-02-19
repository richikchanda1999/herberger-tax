import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/theme";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "src/utils/useArcanaAuth";

const auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ADDRESS!, {
  theme: "light",
  network: "testnet",
  position: 'left'
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
