import useForm from './useForm'

import { cPatientModel, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
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
import NavigationItem from "../Navigation/NavItem/navitem.component";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PatientForm from "./contact"


export interface PatientsModalProps {
  patient: PatientType;
  patientsLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientModal: React.FC<PatientsModalProps> = ({
  patient,
  patientsLoading,
  onChange,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  let [query, setQuery] = useState(patient);
  
  console.log("selPatient inicial:", patient)


  console.log("query inic", query)


  const handleClose = () => {
    //console.log("c:", patient)
    setOpen(false);
  };

  const handleOpen = () => {
    //console.log("c:", patient)
    setQuery(patient);
  };

  
  //console.log("Modal:",patient)
  const isAddMode = !patient
  function onSubmit(data: any) {
    return isAddMode
      ? createPatient(data)
      : onUpdatePatient(data);
  }

  function createPatient(data: any) {
    return (null)
  }

  // Update inputs value
  const handleParam = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const renderModal = (
    <Dialog
      fullWidth={false}
      maxWidth={'md'}
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>------------- Altera paciente -------------</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-3" >
          <form onSubmit={onSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="form-control"
                value={query.name}
                onChange={handleParam()}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                required
                placeholder="Email"
                className="form-control"
                value={query.email}
                onChange={handleParam()}
              />
            </div>
            <div>
              <label>Telefone</label>
              <input
                type="text"
                name="telephone"
                required
                placeholder="Telefone"
                className="form-control"
                value={query.telephone}
                onChange={handleParam()}
              />
            </div>
            <button type="submit">Gravar</button>
          </form>


        </ Grid>
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

}

export default React.memo(PatientModal);