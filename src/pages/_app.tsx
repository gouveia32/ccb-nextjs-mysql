import { ChakraProvider } from '@chakra-ui/react'
import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "components/Layout";

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <title>ccb-Ponto Fino Bordados</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
