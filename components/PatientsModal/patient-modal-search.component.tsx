import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import {
  HeaderLeft,
  HeaderRight,
  FootLeft,
  FootRight,
} from "./patient-modal.styles"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import { cPatientModel, PatientObject, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";


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
      LISTA DE PACIENTES
      <HeaderRight>
        <IconButton onClick={handleClose} size={"small"} >
          <CloseOutlinedIcon />
        </IconButton>
      </HeaderRight>
    </HeaderLeft>
  );

  const handleOnPatientClick = () => {
    console.log("Paciente:")
  };

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
              <NavigationItem
                key={patient.id}
                icon={(index + 1)}
                name={`${patient.name}   |   ${patient.email}`}
                onClick={handleOnPatientClick}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <FootLeft>
          <p>...</p>
          <FootRight>
            <p>+++</p>
          </FootRight>
        </FootLeft>
      </ DialogActions>
    </Dialog >
  );
  //console.log("aqui...",patient)
  return (
    <>
      {renderModal}
      <NavigationItem
        name={""}
        onClick={() => {
          setOpen((prevState) => !prevState)
        }}
        icon={<PersonOutlineOutlinedIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModalSearch);

