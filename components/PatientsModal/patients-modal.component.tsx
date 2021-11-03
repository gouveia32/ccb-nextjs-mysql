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
import { Formik, Field, Form, ErrorMessage } from "formik";
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
        <Form>
          <div>
            <label htmlFor="fullName" className="p4-5 px-1 font-thin">
              Nome:
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Nome"
              className="px-4 py-3 w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
            />
            <div className="text-red-600 font-semibold text-xs">
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="pt-5 px-1 font-thin">
              Email:
            </label>
            <Field
              type="text"
              name="email"
              placeholder="Email"
              className="px-4 py-3 w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
            />
            <div className="text-red-600 font-semibold text-xs">
              <ErrorMessage name="email" />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-300 hover:text-black text-white py-2 rounded-md transition duration-100"
          >
            Submit
          </button>
        </Form>







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
