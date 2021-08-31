import { Tooltip } from "@chakra-ui/react";
import useWindowScroll from "@react-hook/window-scroll";
import React from "react";
import { slide  as Menu } from "react-burger-menu";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { ThemeType } from "../../context/theme";
import AnimatedListItem from "../Animated/AnimatedListItem";

import ActiveLink from "./ActiveNavLink";

interface SideBarProps {
  theme: ThemeType;
}

const SideBar: React.FC<SideBarProps> = ({ theme }) => {
  const scrollY = useWindowScroll();
  //console.log('scrolly:',scrollY);
  return (
    <Menu
      styles={{
        bmMenu: { 
          backgroundColor: theme === "DARK" && "black",
          color: theme === "DARK" ? "#efecec" : "#010024"
        },
        bmBurgerButton: { display: scrollY > 0 && "none" },
      }}
      right
      width="250px"
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      customBurgerIcon={<GiHamburgerMenu color="#c41717"/>}
      customCrossIcon={
        <ImCross color="#d3aa22" style={{ backgroundColor: "transparent" }} />
      }
    >
      
      <AnimatedListItem indx={0}>
        <ActiveLink href="/" activeClassName="nav-link-active-side-bar">
          <a className="menu-item">Home</a>
        </ActiveLink>
      </AnimatedListItem>
      
      <AnimatedListItem indx={0.3}>
        <ActiveLink href="/clientes" activeClassName="nav-link-active-side-bar">
          <a className="menu-item">Clientes</a>
        </ActiveLink>
      </AnimatedListItem>
      <AnimatedListItem indx={0.3}>
        <ActiveLink href="/contato" activeClassName="nav-link-active-side-bar">
          <a className="menu-item">Contato</a>
        </ActiveLink>
      </AnimatedListItem>
      <AnimatedListItem indx={0.4}>
        <ActiveLink href="/localizacao" activeClassName="nav-link-active-side-bar">
          <a className="menu-item">Localização</a>
        </ActiveLink>
      </AnimatedListItem>
    </Menu>
  );
};

export default SideBar;