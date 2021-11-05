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
import { Loading } from "../Loading/loading.component";
import PatientModalItem from "./PatientModalItem/patient-modal-item.component";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


export interface PatientsModalProps {
  patient: PatientType;
  patientsLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  patient,
  patientsLoading,
  onChange,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    console.log("c:", patient)
    setOpen(false);
  };

  //console.log("Modal:",patient)

  // form validation rules 

  const isAddMode = !patient;

  const handleChange = (attr: string, val: any) => {
    const newPatient: any = { ...patient };
    console.log("newPtient1:", newPatient)
    newPatient[attr] = val;
    console.log("newPtient2:", newPatient)
    onChange(newPatient);
  };
  
  const { register, handleSubmit } = useForm();
  
  const [name, setName] = useState(patient.name)
  const [weight, setWeight] = useState(patient.weight)

  function onSubmit() {
    const p: PatientType = { ...patient };

      p.name = name,
      p.weight = weight

    console.log("sub:",p)
    return isAddMode
  }

  const renderModal = (
    <Dialog
      fullWidth={false}
      maxWidth={'md'}
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>------------- Altera paciente -------------</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-3" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label={"Nome:"}
              value={patient.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(e) => patient.namesetName(e.target.value)}
            />
            <TextField
              label={"Altura:"}
              value={patient.weight}
              {...register("weigth")}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />


            <input type="submit" />
          </form>


          {/* 
          <Grid item={true}>
            <TextField
              label={"Nome:"}
              value={patient.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                handleChange(cPatientModel.name, event.target.value)
              }
            />
            <TextField
              label={"Email:"}
              value={patient.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                handleChange(cPatientModel.email, event.target.value)
              }
            />
            <TextField
              label={"Telefone:"}
              value={patient.telephone}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                handleChange(cPatientModel.telephone, event.target.value)
              }
            />
            <TextField
              label={"Altura:"}
              value={patient.height}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                handleChange(cPatientModel.height, event.target.value)
              }
            />
            <TextField
              label={"Peso:"}
              value={patient.weight}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                handleChange(cPatientModel.weight, event.target.value)
              }
            />
          </Grid> */}

        </Grid>


        <DialogActions>
          <IconButton size={"small"} onClick={handleClose}>
            <CloseOutlinedIcon />Não
          </IconButton>

          <IconButton size={"small"} onClick={onSubmit}>
            <CheckOutlinedIcon />Sim
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
        onClick={() => setOpen((prevState) => !prevState)}
        icon={<EditOutlinedIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModal);
