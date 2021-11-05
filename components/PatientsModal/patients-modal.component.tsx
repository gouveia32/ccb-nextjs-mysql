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

import { useRouter } from 'next/router';

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
  const isAddMode = !patient;
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é obrigatório'),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  //if (!isAddMode) {
  //  formOptions.defaultValues = defaultValues;
  //}

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // form validation rules 

  const handleChange = (attr: string, val: any) => {
    const newPatient: any = { ...patient };
    console.log("newPtient1:", newPatient)
    newPatient[attr] = val;
    console.log("newPtient2:", newPatient)
    onChange(newPatient);
  };

  const [name, setName] = useState(patient.name)
  const [weight, setWeight] = useState(patient.weight)

  function onSubmit(data: any) {
    return isAddMode
        ? createPatient(data)
        : updatePatient(patient.id, data);
}

function createPatient(data: any) {
  return ( null )
}

function updatePatient(id: string, data: any) {
  const p: PatientType = { ...data };
  console.log("id:", id)
  console.log("data:", data)
  console.log("p:", p)
  {onChange}
  return (null);
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
              {...register('name')}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label={"Peso:"}
              value={patient.weight}
              {...register("weigth")}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />

            <div className="form-group col-5">
              <label>Altura</label>
              <input type="text" {...register('heigth')} className={`form-control ${errors.heigth ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.heigth?.message}</div>
            </div>


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
