import React, { ReactNode, useEffect, useState } from "react";
import {
  NavContent,
  NavLeft,
  NavLogo,
  NavRight,
  NavTop,
  NavMedico,
  NavMedicoImage,
} from "./navbar.styles";
import { Button, IconButton, useMediaQuery } from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import NavigationItem from "../NavItem/navitem.component";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import KeepLogo from "../../../resources/assets/keep.svg";
import MenuIcon from "@material-ui/icons/Menu";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  selectNewPaciente,
  selectPacientes,
  selectPacientesLoading,
  PacientesAPI,
} from "../../../API/PacientesAPI/PacientesAPI";
import { useDispatch, useSelector } from "react-redux";
import { PacienteType } from "../../../models/Paciente";
import PacientesModal from "../../PacientesModal/pacientes-modal.component";
import Link from "next/link";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import { ChangeActionType } from "../../../lib/helpers";
import { Loading } from "../../Loading/loading.component";
import useRouterRefresh from "../../../hooks/useRouterRefresh";
import { PageLinks } from "../../../lib/Links";
import { device } from "../../../resources/styles/utils/media-query-utils";
import NavSearchField from "../NavSearchField/nav-search-field.component";
import {
  NotesAPI,
  selectSearchNotesQuery,
} from "../../../API/NotesPageAPI/NotesAPI";

export interface NavbarProps {
  children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }: NavbarProps) => {
  const matchesMobileL = useMediaQuery(device.mobileL);

  const [openNav, setOpenNav] = useState(!matchesMobileL);

  const [session, loading] = useSession();

  const dispatch = useDispatch();

  const refresh = useRouterRefresh();

  const router = useRouter();

  const pacientesLoading: boolean = useSelector(selectPacientesLoading);
  const pacientes: PacienteType[] = useSelector(selectPacientes);
  const newPaciente: PacienteType = useSelector(selectNewPaciente);
  const searchNotesQuery = useSelector(selectSearchNotesQuery);

  const handleOnNavClick = () => {
    dispatch(NotesAPI.reset());
  };

  useEffect(() => {
    dispatch(PacientesAPI.fetchPacientes());
  }, [dispatch, session]);

  const renderMenuIcon = session && (
    <IconButton
      color="inherit"
      className="ms-1"
      aria-label="open drawer"
      onClick={() => setOpenNav((prevState) => !prevState)}
      edge="start"
    >
      <MenuIcon />
    </IconButton>
  );

  const renderPacienteLinks = pacientesLoading ? (
    <Loading size={25} />
  ) : (
    pacientes &&
    pacientes.map((paciente: PacienteType, index: number) => (
      <NavigationItem
        key={paciente.id}
        name={paciente.name}
        icon={<LabelOutlinedIcon />}
        url={`${PageLinks.pacientesPage}/${paciente.id}`}
        isPaciente={true}
        isActive={router.query.pacienteId === paciente.id}
        onClick={handleOnNavClick}
      />
    ))
  );

  const renderDrawer = session &&
    (router.pathname.includes("/notes") ||
      router.pathname.includes("/pacientes")) && (
      <NavLeft open={openNav}>
        <NavigationItem
          name={"Notas"}
          url={PageLinks.notesPage}
          icon={<EmojiObjectsOutlinedIcon />}
          isActive={
            router.pathname.includes("notes") &&
            !router.pathname.includes("all")
          }
          isOpen={openNav}
          onClick={handleOnNavClick}
        />
        {renderPacienteLinks}
        <PacientesModal
          newPaciente={newPaciente}
          pacientes={pacientes}
          pacientesLoading={pacientesLoading}
          onChange={(value: ChangeActionType) =>
            dispatch(PacientesAPI.handleChange(value))
          }
          onAddPaciente={() => dispatch(PacientesAPI.addPaciente())}
          onUpdatePaciente={(paciente: PacienteType) => dispatch(PacientesAPI.updatePaciente(paciente))}
          onDeletePaciente={(paciente: PacienteType) => {
            dispatch(PacientesAPI.deletePaciente(paciente));
            refresh();
          }}
        />
      </NavLeft>
    );

  const renderMedicoBar = session && (
    <NavMedico>
      <NavMedicoImage imageUrl={session?.medico?.image}></NavMedicoImage>
      <h6 className="m-0 ms-2 me-3">
        <strong>{session?.medico?.name}</strong>
      </h6>
      {matchesMobileL ? (
        <IconButton size={"small"} onClick={() => signOut()}>
          <ExitToAppOutlinedIcon />
        </IconButton>
      ) : (
        <Button
          size={"small"}
          variant={"outlined"}
          onClick={() => signOut()}
          startIcon={<ExitToAppOutlinedIcon />}
        >
          Sair
        </Button>
      )}
    </NavMedico>
  );

  const renderLogo = (
    <Link href={PageLinks.landingPage}>
      <NavLogo>
        <KeepLogo className="ms-2" />
        <h2 className="m-0 ms-2">Notas</h2>
      </NavLogo>
    </Link>
  );

  const renderSignIn = !session && (
    <NavMedico>
      <Button
        size={"small"}
        variant={"outlined"}
        onClick={() => signIn()}
        startIcon={<PersonOutlineOutlinedIcon />}
      >
        Entrar
      </Button>
    </NavMedico>
  );

  const renderSearchField = session && (
    <NavSearchField
      onSearch={(query: string) =>
        dispatch(
          NotesAPI.searchNotes({
            query: query,
            pacienteId: router.query.pacienteId
              ? (router.query.pacienteId as string)
              : undefined,
          })
        )
      }
      value={searchNotesQuery}
    />
  );

  return (
    <>
      <NavTop>
        {renderMenuIcon}
        {renderLogo}
        {renderSearchField}
        {renderMedicoBar}
        {renderSignIn}
      </NavTop>
      <NavContent>
        {renderDrawer}
        <NavRight>{children}</NavRight>
      </NavContent>
    </>
  );
};

export default React.memo(Navbar);
