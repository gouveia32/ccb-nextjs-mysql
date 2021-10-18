import React, { ReactNode, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
  NavContent,
  NavLeft,
  NavLogo,
  NavRight,
  NavTop,
  NavDoctor,
  NavDoctorImage,
  NavDrop,
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
  selectNewTag,
  selectTags,
  selectTagsLoading,
  TagsAPI,
} from "../../../API/TagsAPI/TagsAPI";


import { useDispatch, useSelector } from "react-redux";
import { TagType } from "../../../models/Tag";
import { PatientType } from "../../../models/Patient";
import TagsModal from "../../TagsModal/tags-modal.component";
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

import {
  PatientsAPI,
  selectPatients,
  selectPatientsLoading,
  selectPatient
} from "../../../API/PatientsAPI/PatientsAPI";


export interface NavbarProps {
  children: ReactNode;
}

let GlobalSelectedPatient: string | null = null;

export function selectedPatient() {
  const patientId = GlobalSelectedPatient ? GlobalSelectedPatient : "";

  return (patientId)
}


const Navbar: React.FC<NavbarProps> = ({ children }: NavbarProps) => {

  const [selectedPatient, setSelectedPatient] = useState<string>();

  const matchesMobileL = useMediaQuery(device.mobileL);

  const [openNav, setOpenNav] = useState(!matchesMobileL);

  const [session, loading] = useSession();

  const dispatch = useDispatch();

  const refresh = useRouterRefresh();

  const router = useRouter();

  const tagsLoading: boolean = useSelector(selectTagsLoading);
  const patientsLoading: boolean = useSelector(selectPatientsLoading); //incl

  const tags: TagType[] = useSelector(selectTags);
  const newTag: TagType = useSelector(selectNewTag);

  const patients: PatientType[] = useSelector(selectPatients); //incl

  const patient: string | null = useSelector(selectPatient); //incl
  GlobalSelectedPatient = patient
  //setSelectedPatient (GlobalSelectedPatient);

  console.log("Global inicial:", GlobalSelectedPatient)

  const searchNotesQuery = useSelector(selectSearchNotesQuery);

  const handleOnNavClick = () => {
    dispatch(NotesAPI.reset());
  };

  useEffect(() => {
    dispatch(TagsAPI.fetchTags());
    dispatch(PatientsAPI.fetchPatients()) //carregas os pacientes
    dispatch(PatientsAPI.selectPatient())    //pega o primeiro da lista
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

  const renderTagLinks = tagsLoading ? (
    <Loading size={25} />
  ) : (
    tags &&
    tags.map((tag: TagType, index: number) => (
      <NavigationItem
        key={tag.id}
        name={tag.name}
        icon={<LabelOutlinedIcon />}
        url={`${PageLinks.tagsPage}/${tag.id}`}
        isTag={true}
        isActive={router.query.tagId === tag.id}
        onClick={handleOnNavClick}
      />
    ))
  );

  //
  // Seleciona paciente

  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    //console.log("selecionado:", value)
    //setSelectedPatient(value);
    GlobalSelectedPatient = value
    console.log("Global (alt):", GlobalSelectedPatient)
  };


  const renderPatientLinks = patientsLoading ? (
    <Loading size={25} />
  ) : (
    <select onChange={selectChange} >
      <option value="Selecione um paciente" selected disabled>
        Selecione um paciente
      </option>
      {patients && patients.map(item => (
        <option
          key={item.id}
          value={item.id}
          label={item.name}
        >
          {item.name}
        </option>
      ))}
    </select>
  );

  const renderDrawer = session &&
    (router.pathname.includes("/notes") ||
      router.pathname.includes("/tags")) && (
      <NavLeft open={openNav}>
        {renderPatientLinks}
        <NavigationItem
          name={"Tags"}
          url={PageLinks.notesPage}
          icon={<EmojiObjectsOutlinedIcon />}
          isActive={
            router.pathname.includes("notes") &&
            !router.pathname.includes("all")
          }
          isOpen={openNav}
          onClick={handleOnNavClick}
        />
        {renderTagLinks}
        <TagsModal
          newTag={newTag}
          tags={tags}
          tagsLoading={tagsLoading}
          onChange={(value: ChangeActionType) =>
            dispatch(TagsAPI.handleChange(value))
          }
          onAddTag={() => dispatch(TagsAPI.addTag())}
          onUpdateTag={(tag: TagType) => dispatch(TagsAPI.updateTag(tag))}
          onDeleteTag={(tag: TagType) => {
            dispatch(TagsAPI.deleteTag(tag));
            refresh();
          }}
        />
      </NavLeft>
    );

  //console.log("session:",session)
  const renderDoctorBar = session && (
    <NavDoctor>
      <NavDoctorImage imageUrl={session?.user?.image}></NavDoctorImage>
      <h6 className="m-0 ms-2 me-3">
        <strong>{session?.user?.name}</strong>
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
    </NavDoctor>
  );

  const renderLogo = (
    <Link href={PageLinks.landingPage}>
      <NavLogo>
        <KeepLogo className="ms-2" />
        <h2 className="m-0 ms-2">Consultas</h2>
      </NavLogo>
    </Link>
  );

  const renderSignIn = !session && (
    <NavDoctor>
      <Button
        size={"small"}
        variant={"outlined"}
        onClick={() => signIn()}
        startIcon={<PersonOutlineOutlinedIcon />}
      >
        Entrar
      </Button>
    </NavDoctor>
  );

  const renderSearchField = session && (
    <NavSearchField
      onSearch={(query: string) =>
        dispatch(
          NotesAPI.searchNotes({
            query: query,
            tagId: router.query.tagId
              ? (router.query.tagId as string)
              : undefined,
          })
        )
      }
      value={searchNotesQuery}
    />
  );


  const renderAcao = session && (
    <Button
      size={"small"}
      variant={"outlined"}
      onClick={() => {
        console.log("patient:", GlobalSelectedPatient)
      }}
      startIcon={<PersonOutlineOutlinedIcon />}
    >
      AÇÃO
    </Button>
  )

  return (
    <>
      <NavTop>
        {renderMenuIcon}
        {renderLogo}
        {renderSearchField}
        {renderAcao}
        {renderDoctorBar}
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
