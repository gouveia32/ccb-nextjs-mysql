import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";

import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
  AiFillFacebook,
} from "react-icons/ai";

import MeComponent from "./MeComponent";
import { ThemeContext } from "../context/ThemeContext";

interface FooterBottomComponentProps {}

const FooterBottomComponent: React.FC<FooterBottomComponentProps> = () => {
  const  { theme } = useContext(ThemeContext)
  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex>
        <AiFillFacebook
          style={{ margin: "0 10px", color: theme === 'DARK' && '#505c75' }}
          className="fb-icon"
          fontSize="2rem"
          
        />
        <AiFillInstagram
          style={{ margin: "0 10px", color: theme === 'DARK' && '#505c75' }}
          className="inst-icon"
          fontSize="2rem"
          
        />
        <AiFillTwitterSquare
          style={{ margin: "0 10px", color: theme === 'DARK' && '#505c75' }}
          className="twitt-icon"
          fontSize="2rem"
          
        />
        <AiFillYoutube
          style={{ margin: "0 10px", color: theme === 'DARK' && '#505c75' }}
          
          className="yt-icon"
          fontSize="2rem"
        />
      </Flex>
      <MeComponent />
    </Flex>
  );
};

export default FooterBottomComponent;
