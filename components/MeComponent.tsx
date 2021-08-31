import { Flex, Text, Tooltip } from "@chakra-ui/react";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface MeComponentProps {
  isLanding?: boolean;
}

const MeComponent: React.FC<MeComponentProps> = ({ isLanding }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Flex
      bgColor={theme === "DARK" ? "black" : "white"}
      borderRadius={50}
      marginTop={10}
      padding={isLanding ? "5px 0" : "5px 20px"}
      justifyContent={isLanding ? "start" : "center"}
      alignItems="center"
    >
      <Text
        color={theme === "DARK" && "#eee"}
        fontFamily="Roboto"
        fontWeight="bolder"
        fontSize="15px"
      >
        (c) 2021 - José Alves de Gouveia
      </Text>
      
    </Flex>
  );
};

export default MeComponent;
