import React from "react";
import { NavItem, NavItemContent, NavItemIcon } from "./navitem.styles";
import { useRouter } from "next/router";

export interface NavigationItemProps {
  name: string;
  icon: any;
  url?: string;
  onClick?: () => void;
  isActive?: boolean;
  isOpen?: boolean;
  isPaciente?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  name,
  url,
  icon,
  onClick,
  isActive,
  isOpen,
  isPaciente,
}: NavigationItemProps) => {
  const { push } = useRouter();

  const handleOnClick = () => {
    onClick && onClick();
    url && push(url);
  };

  return (
    <NavItem
      active={isActive ?? false}
      open={isOpen ?? true}
      onClick={handleOnClick}
      isPaciente={isPaciente}
    >
      <NavItemIcon>{icon}</NavItemIcon>
      <NavItemContent isPaciente={!!isPaciente}>{name}</NavItemContent>
    </NavItem>
  );
};

export default React.memo(NavigationItem);
