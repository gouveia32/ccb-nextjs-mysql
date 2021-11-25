import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import {
  HeaderLeft,
  HeaderRight,
  FootLeft,
  FootRight,
  ButtonRec,
  ButtonDelete,
  ButtonNew,
} from "../patient-modal.styles"
import {
  selectNewPatient,
  PatientsAPI,
  selectSearchPatients,
  selectSearchPatientsQuery,
  selectPatients,
  selectPatientsLoading,
  selectPatient,
} from "../../../API/PatientsAPI/PatientsAPI";

import { useDispatch, useSelector } from "react-redux";
import { parseCookies, setCookie } from 'nookies'

import SearchIcon from '@material-ui/icons/Search';
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { cPatientModel, PatientObject, PatientType } from "../../../models/Patient";
import { ChangeActionType } from "../../../lib/helpers";
import PatientModalItem from "./patient-modal-item";


export interface PatientsModalProps {
  patients: PatientType[];
  newPatient: PatientType;
  patientsLoading: boolean;
  onChangePatient: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModalSearch: React.FC<PatientsModalProps> = ({
  patients,
  newPatient,
  patientsLoading,
  onChangePatient,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [strPesq, setStrPesq] = useState<string>("");
  const dispatch = useDispatch();

  const searchPatientsQuery = useSelector(selectSearchPatientsQuery);

  const handleClose = () => {
    //console.log("c:", cPatientModel)

    setOpen(false);
  };

  const handleSearchPatient = () => {
    dispatch(
      PatientsAPI.searchPatients({
        query: strPesq,
      })
    )
/*     dispatch(
      PatientsAPI.searchPatients({
        query: setStrPesq,
      })
    )
 */    console.log("query:::", patients)
      setOpen(true)
  }

  const renderHeader = (
    <HeaderLeft>
      PACIENTES
      <HeaderRight>
        <IconButton onClick={handleClose} size={"small"} >
          <CloseOutlinedIcon />
        </IconButton>
      </HeaderRight>
    </HeaderLeft>
  );

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Seleciona paciente
  const selectChange = async (patient: PatientType) => {

    onChangePatient({ attr: "patient", value: patient })
    await sleep(500);
    setOpen(false);
  }

  const renderModal = (
    <Dialog
      fullWidth={false}
      maxWidth={'md'}
      open={open}
      onClose={handleClose}>
      <DialogTitle>
        {renderHeader}
        <TextField
          label={"Buscar por:"}
          defaultValue={searchPatientsQuery}
          fullWidth={true}
          size={"small"}
          variant={"filled"}
          onChange={(event) => setStrPesq(event.target.value)}
          onKeyDown={(event) =>
            event.keyCode === 13 && handleSearchPatient()
          }
        />
      </DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-3" >
          <Grid item={true}>
            {patients.slice(0, 3).map((patient: PatientType, index: number) => (
              <PatientModalItem
                key={patient.id}
                icon={(index + 1)}
                name={`${patient.name}   |   ${patient.email}`}
                onClick={(event: any) => {
                  selectChange(patient)
                }}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>

    </Dialog >
  );
  //console.log("aqui...",patient)
  return (
    <>
      {renderModal}
      <PatientModalItem
        name={""}
        onClick={() => {
          setOpen((prevState) => !prevState)
        }}
        icon={<SearchIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModalSearch);

