import React, { useState } from "react";
import { NoteObject, NoteType, NoteTypeEnum } from "../../models/Note";
import { CheckPointType } from "../../models/CheckPointObject";
import NoteCardCheckItem from "./NoteCardCheckItem/note-card-checkitem.component";
import { PacienteType } from "../../models/Paciente";
import { ChangeActionType } from "../../lib/helpers";
import { Dialog, Divider, IconButton } from "@material-ui/core";
import {
  NoteCardComponent,
  NoteCardContent,
  NoteCardHeader,
  NoteCardPaciente,
  NoteCardPacientes,
} from "./note-card.styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import AddNote from "../AddNote/add-note.component";

const transition = {
  type: "spring",
  stiffness: 100,
};

const noteVariants = {
  exit: { y: "50%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

export interface NoteCardProps {
  note: NoteType;
  pacientes: PacienteType[];
  editNote: NoteType | null;
  onHandleChange: (action: ChangeActionType) => void;
  onAddNote: () => void;
  onDeleteNote: () => void;
  onClick?: () => void;
  onCheckItemClick?: (checkItem: CheckPointType) => void;
  onCloseModal?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  pacientes,
  editNote,
  onAddNote,
  onHandleChange,
  onCloseModal,
  onClick,
  onCheckItemClick,
  onDeleteNote,
}: NoteCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOnDelete = (e: any) => {
    e.stopPropagation();
    onDeleteNote();
  };

  const renderHeader = (
    <NoteCardHeader>
      <span>{note.name}</span>
      <IconButton onClick={handleOnDelete} size={"small"}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </NoteCardHeader>
  );

  const renderContent =
    note.noteType === NoteTypeEnum.TEXT ? (
      <NoteCardContent>{note.content}</NoteCardContent>
    ) : (
      <NoteCardContent>
        {note.checkPoints
          ?.filter((f) => !f.checked)
          .map((cp: CheckPointType, i: number) => (
            <NoteCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
        {note.checkPoints?.find((f) => f.checked) && (
          <Divider className="bg-dark" />
        )}
        {note.checkPoints
          ?.filter((f) => f.checked)
          .map((cp: CheckPointType, i: number) => (
            <NoteCardCheckItem
              key={i}
              checkItem={cp}
              onChecked={onCheckItemClick}
            />
          ))}
      </NoteCardContent>
    );

  const renderPacientes = note.pacientes.length > 0 && (
    <>
      <Divider className="my-2 bg-dark" />
      <NoteCardPacientes>
        {note.pacientes.map((paciente: PacienteType, k: number) => (
          <NoteCardPaciente key={k}>
            <LabelOutlinedIcon className="me-1" />
            <span>{paciente.name}</span>
          </NoteCardPaciente>
        ))}
      </NoteCardPacientes>
    </>
  );

  const renderEditModal = (
    <Dialog
      fullWidth={true}
      open={modalOpen && !!editNote}
      classes={{
        paper: "bg-transparent",
      }}
      onClose={() => {
        setModalOpen((prevState) => !prevState);
        onCloseModal && onCloseModal();
      }}
    >
      <AddNote
        onHandleChange={onHandleChange}
        noteModel={editNote ? editNote : NoteObject}
        pacientes={pacientes}
        onAddNote={onAddNote}
        edit={true}
      />
    </Dialog>
  );

  return (
    <>
      <NoteCardComponent
        onClick={() => {
          setModalOpen(!modalOpen);
          if (onClick) {
            onClick();
          }
        }}
        color={note.color}
        variants={noteVariants}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {renderHeader}
        {renderContent}
        {renderPacientes}
      </NoteCardComponent>
      {renderEditModal}
    </>
  );
};

export default React.memo(NoteCard);
