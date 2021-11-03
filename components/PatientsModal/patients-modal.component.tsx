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
import { cPatientModel, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";
import { Loading } from "../Loading/loading.component";
import PatientModalItem from "./PatientModalItem/patient-modal-item.component";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


export interface PatientsModalProps {
  newPatient: PatientType;
  patient: PatientType;
  patientsLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  newPatient,
  patient,
  patientsLoading,
  onChange,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  //console.log("Modal:",patient)

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Title is required'),
    email: Yup.string()
      .required('First Name is required'),
    telephone: Yup.string()
      .required('Last Name is required'),
    height: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    weight: Yup.string()
      .required('Role is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const isAddMode = !patient;

  function onSubmit() {
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
      <Grid container={true} className="mb-2" >
          <Grid item={true}>
            <TextField
              label={"Nome:"}
              value={patient.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.name, value: event.target.value })
              }
            />
            <TextField
              label={"Email:"}
              value={patient.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.email, value: event.target.value })
              }
            />
            <TextField
              label={"Telefone:"}
              value={patient.telephone}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.telephone, value: event.target.value })
              }
            />
            <TextField
              label={"Altura:"}
              value={patient.height}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.height, value: event.target.value })
              }
            />
              <TextField
              label={"Peso:"}
              value={patient.weight}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.weight, value: event.target.value })
              }
            />
          </Grid>
          
        </Grid>

        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Não
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Sim
          </Button>
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
