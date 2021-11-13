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
import Button from "@material-ui/core/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { cPatientModel, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";
import { useDispatch, useSelector } from "react-redux";
import {
  PatientsAPI,
  selectPatients,
  selectPatientsLoading,
  selectPatient,
} from "../../API/PatientsAPI/PatientsAPI";

export interface PatientsModalProps {
  patient: PatientType;
  patientsLoading: boolean;
  onChangePatient: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  patient,
  patientsLoading,
  onChangePatient,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  let newPatient: any = { ...patient };


  const dispatch = useDispatch();

  const handleClose = () => {
    //console.log("c:", cPatientModel)
    setOpen(false);
  };

    // form validation rules 

  const isAddMode = !patient;

  const renderModal = (
    <Dialog
      fullWidth={false}
      maxWidth={'md'}
      open={open}
      onClose={handleClose}>
      <DialogTitle>------------- Altera paciente -------------</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-3" >
          <Grid item={true}>
            <TextField
              label={"Nome:"}
              defaultValue={newPatient.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                newPatient["name"] = event.target.value
              }
            />
            <TextField
              label={"Email:"}
              defaultValue={newPatient.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                newPatient["email"] = event.target.value
              }
            />
            <TextField
              label={"Telefone:"}
              defaultValue={newPatient.telephone}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                newPatient["telephone"] = event.target.value
              }
            />
            <TextField
              label={"Altura:"}
              type={"number"}
              defaultValue={newPatient.height}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                newPatient["height"] =  parseInt(event.target.value)
              }
            />
            <TextField
              label={"Peso:"}
              type={"number"}
              defaultValue={newPatient.weight}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) => 
                newPatient["weight"] =  parseInt(event.target.value)
              }
            />
          </Grid>
        </Grid>

        <DialogActions>
          <IconButton size={"small"} onClick={handleClose}>
            <CloseOutlinedIcon />Fechar
          </IconButton>
          <IconButton size={"small"} onClick={(event) => {
            //console.log("Vou gravar:",newPatient)
            onUpdatePatient(newPatient);
            //onChangePatient(newPatient)
            setOpen(false);
          }}>
            <CheckOutlinedIcon />Alterar
          </IconButton>
        </DialogActions>
      </DialogContent>
    </Dialog >
  );
  //console.log("aqui...")
  return (
    <>
      {renderModal}
      <NavigationItem
        name={"Alterar"}
        onClick={() => {
          //console.log("No click:",patient)
          setOpen((prevState) => !prevState)
          //dispatch(PatientsAPI.fetchPatient()).payload

        }}
        icon={<EditOutlinedIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModal);