import React, { ReactNode, useEffect, useState, useContext } from "react";
import {
  NavContent,
  NavLeft,
  NavLogo,
  NavRight,
  NavTop,
  NavDoctor,
  NavDoctorImage,
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
  selectNewPatient
} from "../../../API/PatientsAPI/PatientsAPI";


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

  const tagsLoading: boolean = useSelector(selectTagsLoading);
  const patientsLoading: boolean = useSelector(selectPatientsLoading); //incl

  const tags: TagType[] = useSelector(selectTags);
  const newTag: TagType = useSelector(selectNewTag);

  const patients: PatientType[] = useSelector(selectPatients); //incl
  const newPatient: PatientType = useSelector(selectNewPatient); //incl

  const searchNotesQuery = useSelector(selectSearchNotesQuery);

  const handleOnNavClick = () => {
    dispatch(NotesAPI.reset());
  };

  useEffect(() => {
    dispatch(TagsAPI.fetchTags());
    dispatch(PatientsAPI.fetchPatients()) //incl
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


  const renderPatientLinks = patientsLoading ? (
    <Loading size={25} />
  ) : (
    patients &&
    patients.map((patient: PatientType, index: number) => (
      <NavigationItem
        key={patient.id}
        name={patient.name}
        icon={<LabelOutlinedIcon />}
        url={`${PageLinks.patientsPage}/${patient.id}`}
        isTag={true}
        isActive={router.query.tagId === patient.id}
        onClick={handleOnNavClick}
      />
    ))
  );

  const renderDrawer = session &&
    (router.pathname.includes("/notes") ||
      router.pathname.includes("/tags")) && (
      <NavLeft open={openNav}>
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


  /* const renderPatient = session && (    
    <Button
        size={"small"}
        variant={"outlined"}
        onClick={() => {
          dispatch(
            PatientsAPI.searchPatients({
              query: 'cku4djcsk0090jc81f391fv0z'
            })
          )
        }}
        
        startIcon={<PersonOutlineOutlinedIcon />}
      >
        Paciente
      </Button>
  );
 */
    return (
      <>
        <NavTop>
          {renderMenuIcon}
          {renderLogo}
          {renderSearchField}
          {renderPatientLinks}
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
