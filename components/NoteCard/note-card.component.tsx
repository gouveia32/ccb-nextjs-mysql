import React, { useState } from "react";
import { NoteObject, NoteType, NoteTypeEnum } from "../../models/Note";
import { CheckPointType } from "../../models/CheckPointObject";
import NoteCardCheckItem from "./NoteCardCheckItem/note-card-checkitem.component";
import { TagType } from "../../models/Tag";
import { ChangeActionType } from "../../lib/helpers";
import { Dialog, Divider, IconButton, Tooltip } from "@material-ui/core";
import {
  NoteCardComponent,
  NoteCardContent,
  NoteCardHeader,
  NoteCardTag,
  NoteCardTags,
} from "./note-card.styles";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import PeopleIcon from '@material-ui/icons/People';
import AddNote from "../AddNote/add-note.component";
import { parseISO, format } from 'date-fns';
import { parseCookies, setCookie } from 'nookies'
import { useDispatch, useSelector } from "react-redux";
import useRouterRefresh from "../../hooks/useRouterRefresh";
import {
  PatientsAPI,
} from "../../API/PatientsAPI/PatientsAPI";
import {
  NotesAPI,
} from "../../API/NotesPageAPI/NotesAPI";


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
  tags: TagType[];
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
  tags,
  editNote,
  onAddNote,
  onHandleChange,
  onCloseModal,
  onClick,
  onCheckItemClick,
  onDeleteNote,
}: NoteCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const refresh = useRouterRefresh();

  const handleOnDelete = (e: any) => {
    e.stopPropagation();
    onDeleteNote();
  };

  const handleChangePatient = (e: any) => {
    const cookie = parseCookies(null);
    const patientId = cookie['pe-patient'];

    console.log("pId:", note.patientId);
    if (patientId === "") {
      return (
        <Tooltip title="Selecione o paciente desta nota">
        <IconButton onClick={(e) => {
          setCookie(undefined, 'pe-patient', note.patientId ? note.patientId : '', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })
          dispatch(PatientsAPI.fetchPatient()).payload
          e.stopPropagation();
          setModalOpen(false)

          dispatch(
            NotesAPI.searchNotes({
              query: "",
              tagId: undefined,
            })
          )
          refresh();

        }} size={"small"}>
          <PeopleIcon />
        </IconButton>
      </Tooltip>
      )
    }
  }

  const renderHeader = (
    <NoteCardHeader>
      <span>{note.name}</span>
      {handleChangePatient(null)}
      <IconButton onClick={handleOnDelete} size={"small"}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </NoteCardHeader>
  );

  const dc = parseISO(note.createdAt);

  const renderContent =
    note.noteType === NoteTypeEnum.TEXT ? (
      <NoteCardContent>[{format(dc, 'dd/MM/yy')}] {((note.content).length > 100) ?
        (((note.content).substring(0, 97)) + '...') :
        note.content}</NoteCardContent>
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

export default React.memo(NoteCard);
