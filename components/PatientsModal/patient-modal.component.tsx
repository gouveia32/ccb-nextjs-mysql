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
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { cPatientModel, PatientObject, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";


export interface PatientsModalProps {
  patient: PatientType;
  newPatient: PatientType;
  patientsLoading: boolean;
  onChangePatient: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  patient,
  newPatient,
  patientsLoading,
  onChangePatient,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  let newPatient1 = edit ? { ...patient } : { ...newPatient };

  const handleClose = () => {
    //console.log("c:", cPatientModel)
    setOpen(false);
  };

  const handleGravar = () => {
    console.log("Vou gravar: ", edit, " ", newPatient)
    onUpdatePatient(newPatient)
    //edit ? onUpdatePatient(newPatient) : onAddPatient(newPatient);
    setOpen(false);
    //console.log("c:", cPatientModel)
  };

  const renderModal = (
    <Dialog
      fullWidth={false}
      maxWidth={'md'}
      open={open}
      onClose={handleClose}>
      <DialogTitle>------------- {edit ? 'ALTERAR' : 'NOVO'} PACIENTE -------------</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-3" >
          <Grid item={true}>
            <TextField
              label={"Nome:"}
              defaultValue={newPatient1.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                edit ? newPatient1["name"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.name, value: event.target.value })
              }
            />
            <TextField
              label={"Email:"}
              defaultValue={newPatient1.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? newPatient1["email"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.email, value: event.target.value })
              }
            />
            <TextField
              label={"Telefone:"}
              defaultValue={newPatient1.telephone}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? newPatient1["telephone"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.telephone, value: event.target.value })
              }
            />
            <TextField
              label={"Altura:"}
              type={"number"}
              defaultValue={newPatient1.height}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? newPatient1["height"] = parseInt(event.target.value)
                  : onChangePatient({ attr: cPatientModel.height, value: event.target.value })
              }
            />
            <TextField
              label={"Peso:"}
              type={"number"}
              defaultValue={newPatient1.weight}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? newPatient1["weight"] = parseInt(event.target.value)
                  : onChangePatient({ attr: cPatientModel.weight, value: event.target.value })
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
            //edit ? onUpdatePatient(newPatient) : onAddPatient();
            if (edit) {
              onUpdatePatient(newPatient1);
            } else {
              //console.log("nePatient dig:", newPatient)
              onAddPatient();
            }
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
        name={""}
        onClick={() => {
          setEdit(false)
          //console.log("No click:",patient)
          newPatient = { ...PatientObject };
          setOpen((prevState) => !prevState)
        }}
        icon={<AddOutlinedIcon />}
      />
      <NavigationItem
        name={""}
        onClick={() => {
          setEdit(true)
          //console.log("No click:",patient)
          setOpen((prevState) => !prevState)
        }}
        icon={<EditOutlinedIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModal);

