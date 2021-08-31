import { Flex, Tooltip } from "@chakra-ui/react";
import AnimatedListItem from "../Animated/AnimatedListItem";
import ActiveLink from "./ActiveNavLink";

interface NavLinksProps {}

const NavLinks: React.FC<NavLinksProps> = ({}) => {
  return (
    <div className="nv-links">
      <AnimatedListItem indx={0}>
        <ActiveLink href="/" activeClassName="nav-link-active">
          <a className="nv-link">Home</a>
        </ActiveLink>
      </AnimatedListItem>
      <AnimatedListItem indx={0.3}>
        <ActiveLink href="/clientes" activeClassName="nav-link-active">
          <a className="nv-link">Clientes</a>
        </ActiveLink>
      </AnimatedListItem>
      <AnimatedListItem indx={0.3}>
        <ActiveLink href="/contato" activeClassName="nav-link-active">
          <a className="nv-link">Contato</a>
        </ActiveLink>
      </AnimatedListItem>
      <AnimatedListItem indx={0.4}>
        <ActiveLink href="/localizacao" activeClassName="nav-link-active">
          <a className="nv-link">Localização</a>
        </ActiveLink>
      </AnimatedListItem>
    </div>
  );
};

export default NavLinks;
