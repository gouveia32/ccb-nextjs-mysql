import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import AddNota from "../../components/AddNota/add-nota.component";
import {
  NotasPageAddNota,
  NotasPageNoNotas,
  NotasPageNotas,
} from "../../views/notas/notas-page.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  NotasAPI,
  selectCurrentRoute,
  selectEditNota,
  selectNota,
  selectSearchNotas,
  selectSearchNotasLoading,
} from "../../API/NotasPageAPI/NotasAPI";
import { get } from "../../lib/RestAPI";
import { TipoNota } from "../../models/Nota";
import React, { useEffect, useState } from "react";
import NotaCard from "../../components/NotaCard/nota-card.component";
import { TipoPaciente } from "../../models/Paciente";
import { selectPacientes } from "../../API/PacientesAPI/PacientesAPI";
import { ChangeActionType } from "../../lib/helpers";
import { useRouter } from "next/router";
import { ApiLinks, PageLinks } from "../../lib/Links";
import { TipoControle } from "../../models/ControleObject";
import { Loading } from "../../components/Loading/loading.component";
import Head from "next/head";

export interface NotasPageProps {
  session: Session | null;
  userNotas: TipoNota[];
}

export default function NotasPage({ session, userNotas }: NotasPageProps) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [notasToRender, setNotasToRender] = useState(userNotas);

  const newNota = useSelector(selectNota);
  const editNota = useSelector(selectEditNota);
  const searchNotas = useSelector(selectSearchNotas);
  const searchNotasLoading = useSelector(selectSearchNotasLoading);
  const currentRoute = useSelector(selectCurrentRoute);
  const pacientes: TipoPaciente[] = useSelector(selectPacientes);

  useEffect(() => {
    router.replace(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    if (searchNotas.length > 0) {
      setNotasToRender(searchNotas);
    } else {
      setNotasToRender(userNotas);
    }
  }, [userNotas, searchNotas]);

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

  const renderAddNotaInput = (
    <NotasPageAddNota>
      <AddNota
        pacientes={pacientes}
        onHandleChange={(action) =>
          handleChangeNota({ ...action, edit: false })
        }
        notaModel={newNota}
        onAddNota={() => handleOnAddNota(false)}
      />
    </NotasPageAddNota>
  );

  const renderNotaCards = searchNotasLoading ? (
    <Loading size={30} />
  ) : notasToRender && notasToRender.length > 0 ? (
    <NotasPageNotas>
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
          onClick={() => dispatch(NotasAPI.setNota({ nota: nota, edit: true }))}
          onDeleteNota={() => handleOnDeleteNota(nota)}
          onCheckItemClick={(checkitem) =>
            handleClickNotaCheckItem(nota, checkitem)
          }
        />
      ))}
    </NotasPageNotas>
  ) : (
    <NotasPageNoNotas>
      <h1>Sorry, no notas are available...</h1>
    </NotasPageNoNotas>
  );

  return (
    <>
      <Head>
        <title>Minhas Notas</title>
      </Head>
      {renderAddNotaInput}
      {renderNotaCards}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<NotasPageProps> = async (
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

  const userNotas: TipoNota[] = await get(
    `${process.env.HOST}${ApiLinks.notas}`,
    context.req.headers.cookie!
  );

  return {
    props: {
      session: session,
      userNotas: userNotas,
    },
  };
};
