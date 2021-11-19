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
} from "./patient-modal.styles"
import Button from "@material-ui/core/Button";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

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
  const [del, setDel] = useState<boolean>(false);

  let editPatient = edit ? { ...patient } : { ...newPatient };

  const handleClose = () => {
    //console.log("c:", cPatientModel)
    setOpen(false);
  };

  const handleDelete = () => {
    if (del) {
      onDeletePatient(editPatient);
      setOpen(false);
   }

    setDel((prevState) => !prevState)
    //onDeletePatient(editPatient);
    console.log("delete:", editPatient)
    //setOpen(false);
  };

  const handleGravar = () => {
    console.log("Vou gravar: ", edit, " ", newPatient)
    onUpdatePatient(newPatient)
    //edit ? onUpdatePatient(newPatient) : onAddPatient(newPatient);
    setOpen(false);
    //console.log("c:", cPatientModel)
  };

  const renderButtonNew = edit && (
    <ButtonNew>
      <IconButton size={"small"} onClick={(event) => {
        setEdit(false)
        editPatient = { ...newPatient };
      }}>
        <AddOutlinedIcon />Novo
      </IconButton>
    </ButtonNew>
  )

  const renderButtonRec = (
    <ButtonRec>
      <IconButton size={"small"} onClick={(event) => {
        if (edit) {
          onUpdatePatient(editPatient);
        } else {
          onAddPatient();
        }
        //setOpen(false);
      }}>
        <CheckOutlinedIcon />{edit ? 'Alterar' : 'Inserir'}
      </IconButton>
    </ButtonRec>
  )

  const renderButtonDelete = edit && (
    <ButtonDelete>
      <IconButton size={"small"} onClick={handleDelete}>
        <DeleteOutlineOutlinedIcon />{del ? "Confirme" : "Apagar"}
      </IconButton>
    </ButtonDelete>
  )

  const renderHeader = (
    <HeaderLeft>
      {edit ? 'ALTERAR' : 'NOVO'} PACIENTE
      <HeaderRight>
        <IconButton onClick={handleClose} size={"small"} >
          <CloseOutlinedIcon />
        </IconButton>
      </HeaderRight>
    </HeaderLeft>
  );

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
            <TextField
              label={"Nome:"}
              defaultValue={editPatient.name}
              value={edit ? null : editPatient.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                edit ? editPatient["name"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.name, value: event.target.value })
              }
            />
            <TextField
              label={"Email:"}
              defaultValue={editPatient.email}
              value={edit ? null : editPatient.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["email"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.email, value: event.target.value })
              }
            />
            <TextField
              label={"Telefone:"}
              defaultValue={editPatient.phone}
              value={edit ? null : editPatient.phone}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["phone"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.phone, value: event.target.value })
              }
            />
            <TextField
              label={"Endereço:"}
              defaultValue={editPatient.logradoro}
              value={edit ? null : editPatient.logradoro}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["logradoro"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.logradoro, value: event.target.value })
              }
            />
            <TextField
              label={"Número:"}
              defaultValue={editPatient.numero}
              value={edit ? null : editPatient.numero}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["numero"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.numero, value: event.target.value })
              }
            />
            <TextField
              label={"Bairro:"}
              defaultValue={editPatient.bairro}
              value={edit ? null : editPatient.bairro}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["bairro"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.bairro, value: event.target.value })
              }
            />
            <TextField
              label={"Cidade:"}
              defaultValue={editPatient.municipio}
              value={edit ? null : editPatient.municipio}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["municipio"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.municipio, value: event.target.value })
              }
            />
            <TextField
              label={"UF:"}
              defaultValue={editPatient.uf}
              value={edit ? null : editPatient.uf}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["uf"] = event.target.value
                  : onChangePatient({ attr: cPatientModel.uf, value: event.target.value })
              }
            />
            <TextField
              label={"Altura:"}
              type={"number"}
              defaultValue={editPatient.height}
              value={edit ? null : editPatient.height}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["height"] = parseInt(event.target.value)
                  : onChangePatient({ attr: cPatientModel.height, value: event.target.value })
              }
            />
            <TextField
              label={"Peso:"}
              type={"number"}
              defaultValue={editPatient.weight}
              value={edit ? null : editPatient.weight}
              fullWidth={false}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editPatient["weight"] = parseInt(event.target.value)
                  : onChangePatient({ attr: cPatientModel.weight, value: event.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <FootLeft>
          {renderButtonNew}
          <FootRight>
            {renderButtonRec}
            {renderButtonDelete}
          </FootRight>
        </FootLeft>
      </ DialogActions>
    </Dialog >
  );
  //console.log("aqui...")
  return (
    <>
      {renderModal}
      <NavigationItem
        name={"Paciente:"}
        onClick={() => {
          setEdit(true)
          setDel(false)
          setOpen((prevState) => !prevState)
        }}
        icon={<EditOutlinedIcon />}
      />
    </>
  );
};

export default React.memo(PatientsModal);

