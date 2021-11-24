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

import {
  TextField,
} from "@material-ui/core";

import { Button, IconButton, useMediaQuery } from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import NavigationItem from "../NavItem/navitem.component";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import SearchIcon from "@material-ui/icons/Search";
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
import { DoctorType } from "../../../models/Doctor";
import TagsModal from "../../TagsModal/tags-modal.component";
import Link from "next/link";
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
  selectNewPatient,
  PatientsAPI,
  selectPatients,
  selectPatientsLoading,
  selectPatient,
} from "../../../API/PatientsAPI/PatientsAPI";

import {
  selectNewDoctor,
  DoctorsAPI,
  selectDoctors,
  selectDoctorsLoading,
  selectDoctor,
} from "../../../API/DoctorsAPI/DoctorsAPI";

import { parseCookies, setCookie } from 'nookies'
import PatientModal from "../../PatientsModal/patient-modal.component";
import PatientsModalSearch from "../../PatientsModal/patients-search/patient-modal-search.component";

import DoctorModal from "../../DoctorModal/doctor-modal.component";

import PatientModalItem from "../../PatientsModal/patients-search/patient-modal-item"


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
  const tags: TagType[] = useSelector(selectTags);
  const newTag: TagType = useSelector(selectNewTag);

  //console.log("newTag",newTag);

  const patientsLoading: boolean = useSelector(selectPatientsLoading); //incl
  const doctorsLoading: boolean = useSelector(selectDoctorsLoading); //incl
  const patients: PatientType[] = useSelector(selectPatients);
  //const newPatient: PatientType = useSelector(selectNewPatient);



  let newPatient: PatientType = useSelector(selectNewPatient); //incl
  let Patient: PatientType = useSelector(selectPatient); //incl

  let newDoctor: DoctorType = useSelector(selectNewDoctor); //incl
  let Doctor: DoctorType = useSelector(selectDoctor); //incl


  //console.log("Doctor..", Doctor);

  function MyCookie() {
    const cookie = parseCookies(null);
    const patientId = cookie['pe-patient'];

    return patientId
  }

  const searchNotesQuery = useSelector(selectSearchNotesQuery);

  const handleOnNavClick = () => {
    dispatch(NotesAPI.reset());
  };

  useEffect(() => {
    dispatch(TagsAPI.fetchTags());
    dispatch(PatientsAPI.fetchPatients()) //carregas os pacientes
    dispatch(PatientsAPI.fetchPatient())    //pega o primeiro do cookie

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
        icon={(index + 1)}
        name={tag.name}
        url={`${PageLinks.tagsPage}/${tag.id}`}
        isTag={true}
        isActive={router.query.tagId === tag.id}
        onClick={handleOnNavClick}
      />
    ))
  );

  //
  // Seleciona paciente
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    console.log("setCookie:", value)
    setCookie(undefined, 'pe-patient', value ? value : '', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })


    dispatch(PatientsAPI.fetchPatient()).payload
    dispatch(NotesAPI.reset());
    //console.log("selectChange ", Patient)
    refresh();
  };

  const renderPatientLinks1 = session && (
    patientsLoading ? (
      <Loading size={25} />
    ) : (
      <select onChange={selectChange} >
        <option value="DEFAULT" >
          Selecione um paciente
        </option>
        {patients && patients.map(item => (
          <option
            key={item.id}
            value={item.id}
            label={item.name}
            selected={item.id === MyCookie()}
          >
            {item.name}
          </option>
        ))}
      </select>
    ));

  const renderPatientLinks = session && (
    patientsLoading ? (
      <Loading size={25} />
    ) : (
      <TextField
        label={"Paciente:"}
        value={Patient.name}
        fullWidth={false}
        size={"small"}
        variant={"filled"}
        InputProps={{
          endAdornment: <PatientsModalSearch
            patients={patients}
            newPatient={newPatient}
            patientsLoading={patientsLoading}
            onChangePatient={(event: ChangeActionType) => {
              const patient = event.value;
              //console.log("p onChange value ", patient)
              dispatch(PatientsAPI.handleChange(event))
              setCookie(undefined, 'pe-patient', patient.id ? patient.id : '', {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
              })

              dispatch(PatientsAPI.fetchPatient()).payload
              dispatch(NotesAPI.reset());
              //console.log("selectChange ", Patient)
              refresh();
              //console.log("p onChange", Patient)
            }}
            onAddPatient={() => {
              //console.log("newPatient add:",newPatient)
              dispatch(PatientsAPI.addPatient())
            }
            }
            onUpdatePatient={(patient: PatientType) => dispatch(PatientsAPI.updatePatient(patient))}
            onDeletePatient={(patient: PatientType) => {
              dispatch(PatientsAPI.deletePatient(patient));
              refresh();
            }}
          />,
          disableUnderline: true
        }}
      />
    ));


  const renderDrawer = session &&
    (router.pathname.includes("/notes") ||
      router.pathname.includes("/tags")) && (
      <NavLeft open={openNav}>
        <NavigationItem
          name={"Etiquetas"}
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
          onAddTag={() => {
            //console.log("newTag add:",newTag)
            dispatch(TagsAPI.addTag())
          }
          }
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
      <DoctorModal
        doctor={Doctor}
        newDoctor={newDoctor}
        doctorsLoading={doctorsLoading}
        onChangeDoctor={(value: ChangeActionType) => {
          //console.log("p onChange value ", value)
          dispatch(PatientsAPI.handleChange(value))
          //console.log("p onChange", Patient)
          selectChange
        }}
        onAddDoctor={() => {
          //console.log("newPatient add:",newPatient)
          dispatch(DoctorsAPI.addDoctor())
        }
        }
        onUpdateDoctor={(doctor: DoctorType) => dispatch(DoctorsAPI.updateDoctor(doctor))}
        onDeleteDoctor={(doctor: DoctorType) => {
          dispatch(DoctorsAPI.deleteDoctor(doctor));
          refresh();
        }}
      />
      {/* <NavDoctorImage imageUrl={session?.user?.image}></NavDoctorImage> */}
      <h6 className="m-0 ms-2 me-3">
        <strong>{session?.user?.name} </strong>
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
        <h2 className="m-0 ms-2"></h2>
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

  const renderPatientModal = session && (
    <PatientModal
      patient={Patient}
      newPatient={newPatient}
      patientsLoading={patientsLoading}
      onChangePatient={(value: ChangeActionType) => {
        //console.log("p onChange value ", value)
        dispatch(PatientsAPI.handleChange(value))
        //console.log("p onChange", Patient)
        selectChange
      }}
      onAddPatient={() => {
        //console.log("newPatient add:",newPatient)
        dispatch(PatientsAPI.addPatient())
      }
      }
      onUpdatePatient={(patient: PatientType) => dispatch(PatientsAPI.updatePatient(patient))}
      onDeletePatient={(patient: PatientType) => {
        dispatch(PatientsAPI.deletePatient(patient));
        refresh();
      }}
    />
  );

  return (
    <>
      <NavTop>
        {renderMenuIcon}
        {renderLogo}
        {renderPatientLinks}
        {renderPatientModal}
        {renderSearchField}
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