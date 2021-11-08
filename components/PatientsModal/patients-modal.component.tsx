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
import { useDispatch, useSelector } from "react-redux";

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  PatientsAPI,
  selectPatients,
  selectNewPatient,
  selectPatientsLoading,
  selectPatient,
} from "../../API/PatientsAPI/PatientsAPI";


export interface PatientsModalProps {
  selectedPatient: PatientType;
  patientsLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  selectedPatient,
  patientsLoading,
  onChange,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState(selectedPatient);
  
  console.log("selPatient inicial:", selectedPatient)


  console.log("query inic", query)


  const dispatch = useDispatch();

  const handleClose = () => {
    //console.log("c:", patient)
    setOpen(false);
  };

  const handleOpen = () => {
    //console.log("c:", patient)
    setQuery(selectedPatient);
  };

  
  //console.log("Modal:",patient)
  const isAddMode = !selectedPatient;

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é obrigatório'),

  });
  //const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  //if (!isAddMode) {
  //  formOptions.defaultValues = defaultValues;
  //}

  // get functions to build form with useForm() hook
  //const { register, handleSubmit, reset, formState } = useForm(formOptions);
  //const { errors } = formState;

  // form validation rules 

  /*   const handleChange = (attr: string, val: any) => {
      const newPatient: any = { ...patient };
      console.log("newPtient1:", newPatient)
      newPatient[attr] = val;
      console.log("newPtient2:", newPatient)
      onChange(newPatient);
    };
   */

  function onSubmit(data: any) {
    return isAddMode
      ? createPatient(data)
      : onUpdatePatient(data);
  }

  function createPatient(data: any) {
    return (null)
  }
  /* 
    function updatePatient(id: string, data: any) {
      let p: PatientType = { ...patient };
  
      p.name = data.name;
      p.email = data.email;
      p.telephone = data.telephone;
      p.height = data.height;
      p.weight = data.weight;
      p.image = '';
  
      setOpen(false);
      onUpdatePatient(p);
    } */


  // Update inputs value
  const handleParam = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form Submit function
/*   const formSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("formData", formData);
    //onUpdatePatient(formData);
    setQuery(patient);
  }; */




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





          {/*  <form onSubmit={handleSubmit(onSubmit)}>
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
              label={"Email:"}
              value={patient.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              {...register("email")}
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
              {...register("telephone")}
              onChange={(event) =>
                handleChange(cPatientModel.telephone, event.target.value)
              }
            />
            <TextField
              label={"Peso:"}
              //value={patient.weight}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              {...register("weight")}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />

            <div className="form-group col-5">
              <label>Altura</label>
              <input type="text" {...register('height')} className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.height?.message}</div>
            </div>


        
          </form>


        </Grid>


        <DialogActions>
          <IconButton size={"small"} onClick={handleClose}>
            <CloseOutlinedIcon />Não
          </IconButton>

          <IconButton size={"small"} onClick={onSubmit}>
            <CheckOutlinedIcon />Sim
          </IconButton>
        </DialogActions> */}
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
};

export default React.memo(PatientsModal);
