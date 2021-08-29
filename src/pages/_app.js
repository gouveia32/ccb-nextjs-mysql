import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./../components/header";
import { theme } from "../styles/theme"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
