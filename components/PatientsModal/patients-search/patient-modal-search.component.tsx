import React, { useState } from "react";
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
import { parseCookies, setCookie } from 'nookies'
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
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

  const handleClose = () => {
    //console.log("c:", cPatientModel)
    setOpen(false);
  };


  const renderHeader = (
    <HeaderLeft>
      ESCOLHA UM PACIENTE
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

    //console.log("Sel:",patient)
    //setCookie(undefined, 'pe-patient', patient.id ? patient.id : '', {
    //  maxAge: 30 * 24 * 60 * 60,
    //  path: '/',
    //})
    onChangePatient({attr: "patient",value: patient})
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
        </DialogTitle>
        <DialogContent>
          <Grid container={true} className="mb-3" >
            <Grid item={true}>
              {patients.map((patient: PatientType, index: number) => (
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
          name={"??"}
          onClick={() => {
            setOpen((prevState) => !prevState)
          }}
          icon={null}
        />
      </>
    );
  };

  export default React.memo(PatientsModalSearch);

