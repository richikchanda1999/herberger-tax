import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from 'src/theme'

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraBaseProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraBaseProvider>
}
