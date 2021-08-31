import { Box } from "@chakra-ui/react";
import { useContext } from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import { ThemeContext } from "../context/ThemeContext";
import AnimatedListItem from "../components/Animated/AnimatedListItem";

const Custom404 = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box bgColor={theme === "DARK" && "black"}>
      <Box minH="calc(100vh - 60px)">
        <AnimatedListItem indx={0.7}>
          <Player
            autoplay
            loop
            src="/404-animation.json"
            style={{ width: "80%" }}
          />
        </AnimatedListItem>
      </Box>
    </Box>
  );
};

export default Custom404;
