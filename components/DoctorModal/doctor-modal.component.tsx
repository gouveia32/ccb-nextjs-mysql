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
  ButtonRec,
  ButtonDelete,
  ButtonNew,
} from "./doctor-modal.styles"
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { cDoctorModel, DoctorObject, DoctorType } from "../../models/Doctor";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";


export interface DoctorsModalProps {
  doctor: DoctorType;
  newDoctor: DoctorType;
  doctorsLoading: boolean;
  onChangeDoctor: (value: ChangeActionType) => void;
  onAddDoctor: () => void;
  onUpdateDoctor: (doctor: DoctorType) => void;
  onDeleteDoctor: (doctor: DoctorType) => void;
}

const DoctorsModal: React.FC<DoctorsModalProps> = ({
  doctor,
  newDoctor,
  doctorsLoading,
  onChangeDoctor,
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor,
}: DoctorsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);

  let editDoctor = edit ? { ...doctor } : { ...newDoctor };

  const handleClose = () => {
    //console.log("c:", cDoctorModel)
    setOpen(false);
  };

  const handleDelete = () => {
    if (del) {
      onDeleteDoctor(editDoctor);
      setOpen(false);
   }

    setDel((prevState) => !prevState)
    //onDeleteDoctor(editDoctor);
    console.log("delete:", editDoctor)
    //setOpen(false);
  };

  const handleGravar = () => {
    console.log("Vou gravar: ", edit, " ", newDoctor)
    onUpdateDoctor(newDoctor)
    //edit ? onUpdateDoctor(newDoctor) : onAddDoctor(newDoctor);
    setOpen(false);
    //console.log("c:", cDoctorModel)
  };

  const renderButtonNew = edit && (
    <ButtonNew>
      <IconButton size={"small"} onClick={(event) => {
        setEdit(false)
        editDoctor = { ...newDoctor };
      }}>
        <AddOutlinedIcon />Novo
      </IconButton>
    </ButtonNew>
  )

  const renderButtonRec = (
    <ButtonRec>
      <IconButton size={"small"} onClick={(event) => {
        if (edit) {
          onUpdateDoctor(editDoctor);
        } else {
          onAddDoctor();
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
      {edit ? 'ALTERAR' : 'NOVO'} MÉDICO
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
              defaultValue={editDoctor.name}
              value={edit ? null : editDoctor.name}
              fullWidth={true}
              size={"small"}
              variant={"filled"}
              onChange={(event) =>
                edit ? editDoctor["name"] = event.target.value
                  : onChangeDoctor({ attr: cDoctorModel.name, value: event.target.value })
              }
            />
            <TextField
              label={"Email:"}
              defaultValue={editDoctor.email}
              value={edit ? null : editDoctor.email}
              fullWidth={true}
              size={"small"}
              variant={"outlined"}
              onChange={(event) =>
                edit ? editDoctor["email"] = event.target.value
                  : onChangeDoctor({ attr: cDoctorModel.email, value: event.target.value })
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
        name={"Médico:"}
        onClick={() => {
          setEdit(true)
          setDel(false)
          setOpen((prevState) => !prevState)
        }}
        icon={null}
      />
    </>
  );
};

export default React.memo(DoctorsModal);

