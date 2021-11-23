import React from "react";
import { NavItem, NavItemContent, NavItemIcon } from "./patient-modal-item-styles";
import { useRouter } from "next/router";

export interface PatientModalItemProps {
  name: string;
  icon: any;
  url?: string;
  onClick?: (event: any) => void;
  isActive?: boolean;
  isOpen?: boolean;
  isTag?: boolean;
}

const PatientModalItem: React.FC<PatientModalItemProps> = ({
  name,
  icon,
  onClick,
  isActive,
  isOpen,
}: PatientModalItemProps) => {
  const { push } = useRouter();

  const handleOnClick = (event: any) => {
    onClick && onClick(event);
  };

  return (
    <NavItem
      active={isActive ?? false}
      open={isOpen ?? true}
      onClick={handleOnClick}
    >
      <NavItemIcon>{icon}</NavItemIcon>
      <NavItemContent>{name}</NavItemContent>
    </NavItem>
  );
};

export default React.memo(PatientModalItem);
