import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import AddNote from "../../components/AddNote/add-note.component";
import {
  NotesPageAddNote,
  NotesPageNoNotes,
  NotesPageNotes,
} from "../../views/notes/notes-page.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  NotesAPI,
  selectCurrentRoute,
  selectEditNote,
  selectNote,
  selectSearchNotes,
  selectSearchNotesLoading,
} from "../../API/NotesPageAPI/NotesAPI";
import { get } from "../../lib/RestAPI";
import { NoteType } from "../../models/Note";
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard/note-card.component";
import { TagType } from "../../models/Tag";
import { selectTags } from "../../API/TagsAPI/TagsAPI";
import { ChangeActionType } from "../../lib/helpers";
import { useRouter } from "next/router";
import { ApiLinks, PageLinks } from "../../lib/Links";
import { CheckPointType } from "../../models/CheckPointObject";
import { Loading } from "../../components/Loading/loading.component";
import Head from "next/head";
import nookies from 'nookies'

export interface NotesPageProps {
  session: Session | null;
  doctorNotes: NoteType[];
  patientId: string;
}

export default function NotesPage({ session, doctorNotes, patientId }: NotesPageProps) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [notesToRender, setNotesToRender] = useState(doctorNotes);

  const newNote = useSelector(selectNote);
  const editNote = useSelector(selectEditNote);
  const searchNotes = useSelector(selectSearchNotes);
  const searchNotesLoading = useSelector(selectSearchNotesLoading);
  const currentRoute = useSelector(selectCurrentRoute);
  const tags: TagType[] = useSelector(selectTags);

  useEffect(() => {
    router.replace(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    if (searchNotes.length > 0) {
      setNotesToRender(searchNotes);
    } else {
      setNotesToRender(doctorNotes);
    }
  }, [doctorNotes, searchNotes]);

  const handleOnAddNote = (update: boolean) => {
    dispatch(NotesAPI.addNote(update));
  };

  const handleChangeNote = (action: ChangeActionType) => {
    dispatch(NotesAPI.handleChange(action));
  };

  const handleOnDeleteNote = (note: NoteType) => {
    dispatch(NotesAPI.deleteNote(note));
  };

  const handleClickNoteCheckItem = (
    note: NoteType,
    checkitem: CheckPointType
  ) => {
    dispatch(NotesAPI.checkNoteAndSubmit({ note: note, checkitem: checkitem }));
  };

  const renderAddNoteInput = (
    <NotesPageAddNote>
      <AddNote
        tags={tags}
        onHandleChange={(action) =>
          handleChangeNote({ ...action, edit: false })
        }
        noteModel={newNote}
        onAddNote={() => handleOnAddNote(false)}
      />
    </NotesPageAddNote>
  );

  const renderNoteCards = searchNotesLoading ? (
    <Loading size={30} />
  ) : notesToRender && notesToRender.length > 0 ? (
    <NotesPageNotes>
      {notesToRender.map((note: NoteType, k: number) => (
        <NoteCard
          key={note.id}
          note={note}
          tags={tags}
          editNote={editNote}
          onHandleChange={(action) =>
            handleChangeNote({ ...action, edit: true })
          }
          onAddNote={() => handleOnAddNote(true)}
          onClick={() => dispatch(NotesAPI.setNote({ note: note, edit: true }))}
          onDeleteNote={() => handleOnDeleteNote(note)}
          onCheckItemClick={(checkitem) =>
            handleClickNoteCheckItem(note, checkitem)
          }
        />
      ))}
    </NotesPageNotes>
  ) : ( 
    patientId !== "Selecione um paciente" && 
      <NotesPageNoNotes>
        <h1>Sem nota...</h1>
      </NotesPageNoNotes>
  );  

  //console.log("note:",notesToRender)
  return (
    <>
      <Head>
        <title>Prontu??rio</title>
      </Head>
      {renderAddNoteInput}
      {renderNoteCards}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<NotesPageProps> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PageLinks.landingPage,
      },
    };
  }

  const doctorNotes: NoteType[] = await get(
    `${process.env.HOST}${ApiLinks.notes}`,
    context.req.headers.cookie!
  );

  //console.log("cookie:",context.req.headers.cookie!)

  const patientId = nookies.get(context)['pe-patient'];

  return {
    props: {
      session: session,
      doctorNotes: doctorNotes,
      patientId,
    },
  };
};
