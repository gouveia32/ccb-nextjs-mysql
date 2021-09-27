import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import { TipoNota } from "../../../models/Nota";
import { PacientesPageNoNotes, PacientesPageNotes } from "../../../views/pacientes/[pacienteId]/pacientes-page.styles";
import { useDispatch, useSelector } from "react-redux";
import NotaCard from "../../../components/NotaCard/nota-card.component";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { get } from "../../../lib/RestAPI";
import {
  NotasAPI,
  selectCurrentRoute,
  selectEditNota,
  selectSearchNotas,
  selectSearchNotasLoading,
} from "../../../API/NotasPageAPI/NotasAPI";
import { TipoPaciente } from "../../../models/Paciente";
import { selectPacientes } from "../../../API/PacientesAPI/PacientesAPI";
import { ApiLinks, PageLinks } from "../../../lib/Links";
import { ChangeActionType } from "../../../lib/helpers";
import { TipoControle } from "../../../models/ControleObject";
import { useRouter } from "next/router";
import { Loading } from "../../../components/Loading/loading.component";
import Head from "next/head";

export interface PacientesPageProps {
  session: Session | null;
  pacienteNotas: TipoNota[];
}

export default function PacientesPage({ session, pacienteNotas }: PacientesPageProps) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [notasToRender, setNotasToRender] = useState(pacienteNotas);

  const editNota = useSelector(selectEditNota);
  const currentRoute = useSelector(selectCurrentRoute);
  const pacientes: TipoPaciente[] = useSelector(selectPacientes);
  const searchNotas = useSelector(selectSearchNotas);
  const searchNotasLoading = useSelector(selectSearchNotasLoading);

  useEffect(() => {
    router.replace(router.asPath);
  }, [currentRoute]);

  useEffect(() => {
    if (searchNotas.length > 0) {
      setNotasToRender(searchNotas);
    } else {
      setNotasToRender(pacienteNotas);
    }
  }, [pacienteNotas, searchNotas]);

  const handleOnAddNota = (update: boolean) => {
    dispatch(NotasAPI.addNota(update));
  };

  const handleChangeNota = (action: ChangeActionType) => {
    dispatch(NotasAPI.handleChange(action));
  };

  const handleOnDeleteNota = (nota: TipoNota) => {
    dispatch(NotasAPI.deleteNota(nota));
  };

  const handleClickNotaCheckItem = (
    nota: TipoNota,
    checkitem: TipoControle
  ) => {
    dispatch(NotasAPI.checkNotaAndSubmit({ nota: nota, checkitem: checkitem }));
  };

  return (
    <>
      <Head>
        <title>Paciente notas</title>
      </Head>
      {searchNotasLoading ? (
        <Loading size={30} classname="mt-4" />
      ) : notasToRender && notasToRender.length > 0 ? (
        <PacientesPageNotes>
          {notasToRender.map((nota: TipoNota, k: number) => (
            <NotaCard
              key={nota.id}
              nota={nota}
              pacientes={pacientes}
              editNota={editNota}
              onHandleChange={(action) =>
                handleChangeNota({ ...action, edit: true })
              }
              onAddNota={() => handleOnAddNota(true)}
              onClick={() =>
                dispatch(NotasAPI.setNota({ nota: nota, edit: true }))
              }
              onDeleteNota={() => handleOnDeleteNota(nota)}
              onCheckItemClick={(checkitem) =>
                handleClickNotaCheckItem(nota, checkitem)
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

  const userNotas: TipoNota[] = await get(
    `${process.env.HOST}${ApiLinks.pacientesNotas}/${pacienteId}`,
    context.req.headers.cookie!
  );

  return {
    props: {
      session: session,
      pacienteNotas: userNotas,
    },
  };
};
