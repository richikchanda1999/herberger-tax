import { extendTheme } from '@chakra-ui/react'
import colors from './colors'

const theme = extendTheme({
  fonts: {
    body: `'Nunito Sans', sans-serif`,
  },
  colors
})

export default theme