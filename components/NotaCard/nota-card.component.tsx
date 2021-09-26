import React, { useState } from "react";
import { NotaObject, TipoNota, tipoNotaEnum } from "../../models/Nota";
import { TipoControle } from "../../models/ControleObject";
import NotaCardCheckItem from "./NotaCardCheckItem/nota-card-checkitem.component";
import { TipoPaciente } from "../../models/Paciente";
import { ChangeActionType } from "../../lib/helpers";
import { Dialog, Divider, IconButton } from "@material-ui/core";
import {
  NotaCardComponent,
  NotaCardConteudo,
  NotaCardHeader,
  NotaCardPaciente,
  NotaCardPacientes,
} from "./nota-card.styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import AddNota from "../AddNota/add-nota.component";

const transition = {
  type: "spring",
  stiffness: 100,
};

const notaVariants = {
  exit: { y: "50%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

export interface NotaCardProps {
  nota: TipoNota;
  pacientes: TipoPaciente[];
  editNota: TipoNota | null;
  onHandleChange: (action: ChangeActionType) => void;
  onAddNota: () => void;
  onDeleteNota: () => void;
  onClick?: () => void;
  onCheckItemClick?: (checkItem: TipoControle) => void;
  onCloseModal?: () => void;
}

const NotaCard: React.FC<NotaCardProps> = ({
  nota,
  pacientes,
  editNota,
  onAddNota,
  onHandleChange,
  onCloseModal,
  onClick,
  onCheckItemClick,
  onDeleteNota,
}: NotaCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOnDelete = (e: any) => {
    e.stopPropagation();
    onDeleteNota();
  };

  const renderHeader = (
    <NotaCardHeader>
      <span>{nota.nome}</span>
      <IconButton onClick={handleOnDelete} size={"small"}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </NotaCardHeader>
  );

  const renderContent =
    nota.tipoNota === tipoNotaEnum.TEXT ? (
      <NotaCardConteudo>{nota.conteudo}</NotaCardConteudo>
    ) : (
      <NotaCardConteudo>
        {nota.controles
          ?.filter((f) => !f.marcado)
          .map((cp: TipoControle, i: number) => (
            <NotaCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
        {nota.controles?.find((f) => f.marcado) && (
          <Divider className="bg-dark" />
        )}
        {nota.controles
          ?.filter((f) => f.marcado)
          .map((cp: TipoControle, i: number) => (
            <NotaCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
      </NotaCardConteudo>
    );

  const renderPacientes = nota.pacientes.length > 0 && (
    <>
      <Divider className="my-2 bg-dark" />
      <NotaCardPacientes>
        {nota.pacientes.map((paciente: TipoPaciente, k: number) => (
          <NotaCardPaciente key={k}>
            <LabelOutlinedIcon className="me-1" />
            <span>{paciente.nome}</span>
          </NotaCardPaciente>
        ))}
      </NotaCardPacientes>
    </>
  );

  const renderEditModal = (
    <Dialog
      fullWidth={true}
      open={modalOpen && !!editNota}
      classes={{
        paper: "bg-transparent",
      }}
      onClose={() => {
        setModalOpen((prevState) => !prevState);
        onCloseModal && onCloseModal();
      }}
    >
      <AddNota
        onHandleChange={onHandleChange}
        notaModel={editNota ? editNota : NotaObject}
        pacientes={pacientes}
        onAddNota={onAddNota}
        edit={true}
      />
    </Dialog>
  );

  return (
    <>
      <NotaCardComponent
        onClick={() => {
          setModalOpen(!modalOpen);
          if (onClick) {
            onClick();
          }
        }}
        color={nota.cor}
        variants={notaVariants}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {renderHeader}
        {renderContent}
        {renderPacientes}
      </NotaCardComponent>
      {renderEditModal}
    </>
  );
};

export default React.memo(NotaCard);
