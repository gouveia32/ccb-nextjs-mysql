import React, { useState } from "react";
import { NoteObject, NoteType, NoteTypeEnum } from "../../models/Note";
import { CheckPointType } from "../../models/CheckPointObject";
import { TagType } from "../../models/Tag";
import { ChangeActionType } from "../../lib/helpers";
import { Dialog, Divider, IconButton } from "@material-ui/core";
import {
  NoteCardComponent,
  NoteCardContent,
  NoteCardHeader,
  NoteCardTag,
  NoteCardTags,
} from "./patient-card.styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import AddNote from "../AddNote/add-note.component";
import { parseISO, format } from 'date-fns';

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

export interface PatientCardProps {
  note: NoteType;
  tags: TagType[];
  editNote: NoteType | null;
  onHandleChange: (action: ChangeActionType) => void;
  onAddNote: () => void;
  onDeleteNote: () => void;
  onClick?: () => void;
  onCheckItemClick?: (checkItem: CheckPointType) => void;
  onCloseModal?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  note,
  tags,
  editNote,
  onAddNote,
  onHandleChange,
  onCloseModal,
  onClick,
  onCheckItemClick,
  onDeleteNote,
}: PatientCardProps) => {
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

  const dc = parseISO(note.createdAt);

  const renderContent =
    note.noteType === NoteTypeEnum.TEXT ? (
      <NoteCardContent>[{format(dc,'dd/MM/yy')}] {note.content}</NoteCardContent>
    ) : (
      <NoteCardContent>

      </NoteCardContent>
    );

  const renderTags = note.tags.length > 0 && (
    <>
      <Divider className="my-2 bg-dark" />
      <NoteCardTags>
        {note.tags.map((tag: TagType, k: number) => (
          <NoteCardTag key={k}>
            <LabelOutlinedIcon className="me-1" />
            <span>{tag.name}</span>
          </NoteCardTag>
        ))}
      </NoteCardTags>
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
        tags={tags}
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
        {renderTags}
      </NoteCardComponent>
      {renderEditModal}
    </>
  );
};

export default React.memo(PatientCard);
