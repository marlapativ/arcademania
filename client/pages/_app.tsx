import '../styles/globals.css'
import NavBar from './components/NavBar'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
