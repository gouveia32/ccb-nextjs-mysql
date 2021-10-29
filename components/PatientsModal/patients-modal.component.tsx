import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { cPatientModel, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";
import { Loading } from "../Loading/loading.component";
import PatientModalItem from "./PatientModalItem/patient-modal-item.component";

export interface PatientsModalProps {
  newPatient: PatientType;
  patients: PatientType[];
  patientsLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPatient: () => void;
  onUpdatePatient: (patient: PatientType) => void;
  onDeletePatient: (patient: PatientType) => void;
}

const PatientsModal: React.FC<PatientsModalProps> = ({
  newPatient,
  patients,
  patientsLoading,
  onChange,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
}: PatientsModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const renderModal = (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Altera pacientes</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-2">
          <Grid item={true}>
            <TextField
              value={newPatient.name}
              fullWidth={true}
              size={"small"}
              variant={"standard"}
              onChange={(event) =>
                onChange({ attr: cPatientModel.name, value: event.target.value })
              }
              onKeyDown={(event) => event.code === "Enter" && onAddPatient()}
            />
          </Grid>
          <Grid item={true}>
            <IconButton size={"small"} onClick={onAddPatient}>
              <CheckOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        {patientsLoading ? (
          <Loading size={20} />
        ) : (
          patients &&
          patients.map((patient: PatientType, k: number) => (
            <PatientModalItem
              key={patient.id}
              patient={patient}
              onDeletePatient={onDeletePatient}
              onUpdatePatient={onUpdatePatient}
            />
          ))
        )}
      </DialogContent>
    </Dialog>
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
