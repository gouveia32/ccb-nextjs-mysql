import classes from "../styles/Home.module.css";

import { Box, useMediaQuery } from "@chakra-ui/react";
import Landing from "../components/Landing";
import { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { getCarouselVisiveis,getAmostrasLogo } from "../components/lib/dato-cms"


export default function Home({imagens,amostras}) {
  const { theme } = useContext(ThemeContext);

  const [greaterThan764, setGreaterThan764] = useState(true);

  const [isLargerThan764] = useMediaQuery("(min-width: 764px)");

  const [isGreaterThan1000, setIsGreaterThan1000] = useState(true);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    setIsGreaterThan1000(isLargerThan1000);
  }, [isLargerThan1000]);

  useEffect(() => {
    setGreaterThan764(isLargerThan764);
  }, [isLargerThan764]);

  //console.log("Imagens1:",imagens)
  //console.log("Asmostras1:",amostras)

  return (
    <Box bgColor={theme === "DARK" ? "black" : "white"}>
      <Landing imagens={ imagens }/>
    </Box>
  );
}

export async function getStaticProps() {
  const imagens = await getCarouselVisiveis();
  const amostras = await getAmostrasLogo();
  //console.log("amostras1:",amostras)

  return {
    props: {
      imagens: imagens ?? null,
      amostras: amostras ?? null,

    },
    revalidate: 120,
  };
}