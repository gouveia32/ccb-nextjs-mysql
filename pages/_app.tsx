import "../styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import {
  ChakraProvider,
  theme as chakraTheme,
  useMediaQuery,
} from "@chakra-ui/react";

import { ThemeType } from "../context/theme";

import { ThemeContext } from "../context/ThemeContext";
import SideBar from "../components/navbar/SideBar";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState<"DARK" | "LIGHT">("LIGHT");

  const toggleTheme = (theme: ThemeType) => {
    return setTheme((th) => (th === "LIGHT" ? "DARK" : "LIGHT"));
  };

  return (
    <div id="outer-container">
      <SideBar theme={theme} />
      <ChakraProvider theme={chakraTheme}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeContext.Provider>
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
