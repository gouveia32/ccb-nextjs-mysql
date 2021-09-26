import React, { useState } from "react";
import { PacienteObject, PacienteType, PacienteTypeEnum } from "../../models/Paciente";
import { CheckPointType } from "../../models/ControleObject";
import PacienteCardCheckItem from "./PacienteCardCheckItem/paciente-card-checkitem.component";
import { TagType } from "../../models/Tag";
import { ChangeActionType } from "../../lib/helpers";
import { Dialog, Divider, IconButton } from "@material-ui/core";
import {
  PacienteCardComponent,
  PacienteCardContent,
  PacienteCardHeader,
  PacienteCardTag,
  PacienteCardTags,
} from "./paciente-card.styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import AddPaciente from "../AddPaciente/add-paciente.component";

const transition = {
  type: "spring",
  stiffness: 100,
};

const pacienteVariants = {
  exit: { y: "50%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

export interface PacienteCardProps {
  paciente: PacienteType;
  tags: TagType[];
  editPaciente: PacienteType | null;
  onHandleChange: (action: ChangeActionType) => void;
  onAddPaciente: () => void;
  onDeletePaciente: () => void;
  onClick?: () => void;
  onCheckItemClick?: (checkItem: CheckPointType) => void;
  onCloseModal?: () => void;
}

const PacienteCard: React.FC<PacienteCardProps> = ({
  paciente,
  tags,
  editPaciente,
  onAddPaciente,
  onHandleChange,
  onCloseModal,
  onClick,
  onCheckItemClick,
  onDeletePaciente,
}: PacienteCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOnDelete = (e: any) => {
    e.stopPropagation();
    onDeletePaciente();
  };

  const renderHeader = (
    <PacienteCardHeader>
      <span>{paciente.nome}</span>
      <IconButton onClick={handleOnDelete} size={"small"}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </PacienteCardHeader>
  );

  const renderContent =
      <PacienteCardContent>
        {paciente.checkPoints
          ?.filter((f) => !f.checked)
          .map((cp: CheckPointType, i: number) => (
            <PacienteCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
        {paciente.checkPoints?.find((f) => f.checked) && (
          <Divider className="bg-dark" />
        )}
        {paciente.checkPoints
          ?.filter((f) => f.checked)
          .map((cp: CheckPointType, i: number) => (
            <PacienteCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
      </PacienteCardContent>

  const renderEditModal = (
    <Dialog
      fullWidth={true}
      open={modalOpen && !!editPaciente}
      classes={{
        paper: "bg-transparent",
      }}
      onClose={() => {
        setModalOpen((prevState) => !prevState);
        onCloseModal && onCloseModal();
      }}
    >
      <AddPaciente
        onHandleChange={onHandleChange}
        pacienteModel={editPaciente ? editPaciente : PacienteObject}
        tags={tags}
        onAddPaciente={onAddPaciente}
        edit={true}
      />
    </Dialog>
  );

  return (
    <>
      <PacienteCardComponent
        onClick={() => {
          setModalOpen(!modalOpen);
          if (onClick) {
            onClick();
          }
        }}
        variants={pacienteVariants}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {renderHeader}
        {renderContent}

      </PacienteCardComponent>
      {renderEditModal}
    </>
  );
};

export default React.memo(PacienteCard);
