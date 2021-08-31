import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { GiNightSleep } from "react-icons/gi";
import { BsSun } from "react-icons/bs";

import NavLinks from "./NavLinks";

import Logo from "./Logo";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useGreaterThan from "../../utils/useGreaterThan";
import zap from "../../utils/Redirects"
import Image from "next/image";


interface NavBarProps { }

const NavBar: React.FC<NavBarProps> = ({ }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isGreaterThan = useGreaterThan(764);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2px 15px",
        borderBottomWidth: 1,
        borderBottomColor: "#FFD700",
        backgroundColor: theme === "DARK" ? "black" : "white",
      }}
    >
      <title>Ponto Fino | Bordados</title>
      <Logo />


      <Flex justifyContent="center" alignItems="center">
        {theme === "DARK" ? (
          <motion.div
            onClick={() => toggleTheme(theme)}
            style={{ marginRight: isGreaterThan ? 35 : 70 }}
            whileHover={{ scale: 1.2, color: "#ffd700" }}
            whileTap={{ scale: 0.8, color: "#ffd700" }}

          >
            <BsSun color='#bdb884' fontSize="2rem" />
          </motion.div>
        ) : (
          <motion.div
            onClick={() => toggleTheme(theme)}
            style={{ marginRight: isGreaterThan ? 35 : 70 }}
            whileHover={{ scale: 1.2, color: "#ffd700" }}
            whileTap={{ scale: 0.8, color: "#ffd700" }}
          >
            <GiNightSleep color='#505c75' fontSize="1.6rem" />
          </motion.div>
        )}
        <NavLinks />
      </Flex>
    </div>
  );
};

export default NavBar;
