import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useGreaterThan from "../utils/useGreaterThan";
import MeComponent from "./MeComponent";

import AnimatedText from "./Animated/AnimatedText";


interface LandingProps {imagens}

const Landing: React.FC<LandingProps> = ({ imagens }) => {
  const isGreaterThan = useGreaterThan(764);
  const { theme } = useContext(ThemeContext);
  //console.log("props:",imagens)
  return (
    <Flex
      bgColor={theme === "DARK" && "black"}
      flexDirection={!isGreaterThan ? "column-reverse" : "row"}
      minHeight="calc(100vh - 60px)"
      justifyContent="center"
    >
      <Box flex="1">
        <Flex
          flexDirection="column"
          justifyContent="center"
          h="100%"
          marginTop={1}
          paddingLeft={!isGreaterThan ? 0 : 50}
        >
          <Box marginBottom={10}>
            <AnimatedText minHeightPlaceholder={120} componentName="Heading">
              <Heading
                bgGradient="linear(to-l, #ffc400, #c16768)"
                bgClip="text"
                fontFamily="Anton, sans-serif"
                letterSpacing={4}
                //color="#277ecf"
                fontSize="4rem"
                textAlign={isGreaterThan ? "start" : "center"}
              >
                Bemvindo a
              </Heading>
              <Heading
                fontFamily="Anton, sans-serif"
                color="#ea0b0b"
                letterSpacing={4}
                textAlign={isGreaterThan ? "start" : "center"}
              >
                Ponto Fino Bordados
              </Heading>
            </AnimatedText>
          </Box>
          <Box paddingX={isGreaterThan ? 0 : 15}>
            <Text
              fontFamily="Roboto, sans-serif"
              fontWeight="500"
              marginBottom={isGreaterThan ? 10 : 5}
              textAlign="justify"
              color={theme === 'DARK' ? '#efecec' : '#010024'}
            >
              Colocamos a sua disposição serviços de bordados em alta qualidade, utilizando o que há de mais moderno em tecnologia, aliada à profissionais comprometidos, prestando um atendimento que supere as suas expectativas.
            </Text>
          </Box>
          {isGreaterThan && <MeComponent isLanding />}
        </Flex>
      </Box>

    </Flex>
  );
};

export default Landing;


