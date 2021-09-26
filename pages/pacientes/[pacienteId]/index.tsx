import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { NoteType } from "../../../models/Note";
import { PacientesPageNoNotes, PacientesPageNotes } from "../../../views/pacientes/[pacienteId]/pacientes-page.styles";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../../../components/NoteCard/note-card.component";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { get } from "../../../lib/RestAPI";
import {
  NotesAPI,
  selectCurrentRoute,
  selectEditNote,
  selectSearchNotes,
  selectSearchNotesLoading,
} from "../../../API/NotesPageAPI/NotesAPI";
import { PacienteType } from "../../../models/Paciente";
import { selectPacientes } from "../../../API/PacientesAPI/PacientesAPI";
import { ApiLinks, PageLinks } from "../../../lib/Links";
import { ChangeActionType } from "../../../lib/helpers";
import { CheckPointType } from "../../../models/ControleObject";
import { useRouter } from "next/router";
import { Loading } from "../../../components/Loading/loading.component";
import Head from "next/head";

export interface PacientesPageProps {
  session: Session | null;
  pacienteNotes: NoteType[];
}

export default function PacientesPage({ session, pacienteNotes }: PacientesPageProps) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [notesToRender, setNotesToRender] = useState(pacienteNotes);

  const editNote = useSelector(selectEditNote);
  const currentRoute = useSelector(selectCurrentRoute);
  const pacientes: PacienteType[] = useSelector(selectPacientes);
  const searchNotes = useSelector(selectSearchNotes);
  const searchNotesLoading = useSelector(selectSearchNotesLoading);

  useEffect(() => {
    router.replace(router.asPath);
  }, [currentRoute]);

  useEffect(() => {
    if (searchNotes.length > 0) {
      setNotesToRender(searchNotes);
    } else {
      setNotesToRender(pacienteNotes);
    }
  }, [pacienteNotes, searchNotes]);

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

  return (
    <>
      <Head>
        <title>Paciente notes</title>
      </Head>
      {searchNotesLoading ? (
        <Loading size={30} classname="mt-4" />
      ) : notesToRender && notesToRender.length > 0 ? (
        <PacientesPageNotes>
          {notesToRender.map((note: NoteType, k: number) => (
            <NoteCard
              key={note.id}
              note={note}
              pacientes={pacientes}
              editNote={editNote}
              onHandleChange={(action) =>
                handleChangeNote({ ...action, edit: true })
              }
              onAddNote={() => handleOnAddNote(true)}
              onClick={() =>
                dispatch(NotesAPI.setNote({ note: note, edit: true }))
              }
              onDeleteNote={() => handleOnDeleteNote(note)}
              onCheckItemClick={(checkitem) =>
                handleClickNoteCheckItem(note, checkitem)
              }
            />
          ))}
        </PacientesPageNotes>
      ) : (
        <PacientesPageNoNotes>
          <h1>Desculpe, Não tem nota para esta paciente...</h1>
        </PacientesPageNoNotes>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PacientesPageProps> = async (
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

  const { pacienteId } = context.query;

  const userNotes: NoteType[] = await get(
    `${process.env.HOST}${ApiLinks.pacientesNotes}/${pacienteId}`,
    context.req.headers.cookie!
  );

  return {
    props: {
      session: session,
      pacienteNotes: userNotes,
    },
  };
};
