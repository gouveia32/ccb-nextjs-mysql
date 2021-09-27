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
import PersonSearch from "@material-ui/icons/CheckOutlined";
import { cPacienteModel, TipoPaciente } from "../../models/Paciente";
import { ChangeActionType } from "../../lib/helpers";
import NavigationItem from "../Navigation/NavItem/navitem.component";
import { Loading } from "../Loading/loading.component";
import PacienteModalItem from  "./PacienteModalItem/paciente-modal-item.component";

export interface PacientesModalProps {
  newPaciente: TipoPaciente;
  pacientes: TipoPaciente[];
  pacientesLoading: boolean;
  onChange: (value: ChangeActionType) => void;
  onAddPaciente: () => void;
  onUpdatePaciente: (paciente: TipoPaciente) => void;
  onDeletePaciente: (paciente: TipoPaciente) => void;
}

const PacientesModal: React.FC<PacientesModalProps> = ({
  newPaciente,
  pacientes,
  pacientesLoading,
  onChange,
  onAddPaciente,
  onUpdatePaciente,
  onDeletePaciente,
}: PacientesModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [openP, setOpenP] = useState<boolean>(false);

  const renderModal = (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Alterar pacientes</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-2">
          <Grid item={true}>
            <TextField
              value={newPaciente.nome}
              fullWidth={true}
              size={"small"}
              variant={"standard"}
              onChange={(event) =>
                onChange({ attr: cPacienteModel.nome, value: event.target.value })
              }
              onKeyDown={(event) => event.code === "Enter" && onAddPaciente()}
            />
          </Grid>
          <Grid item={true}>
            <IconButton size={"small"} onClick={onAddPaciente}>
              <CheckOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        {pacientesLoading ? (
          <Loading size={20} />
        ) : (
          pacientes &&
          pacientes.map((paciente: TipoPaciente, k: number) => (
            <PacienteModalItem
              key={paciente.id}
              paciente={paciente}
              onDeletePaciente={onDeletePaciente}
              onUpdatePaciente={onUpdatePaciente}
            />
          ))
        )}
      </DialogContent>
    </Dialog>
  );

  const renderModalP = (
    <Dialog open={openP} onClose={() => setOpenP(false)}>
      <DialogTitle>PACIENTES</DialogTitle>
      <DialogContent>
        <Grid container={true} className="mb-2">
          <Grid item={true}>
            <TextField
              value={newPaciente.nome}
              fullWidth={true}
              size={"small"}
              variant={"standard"}
              onChange={(event) =>
                onChange({ attr: cPacienteModel.nome, value: event.target.value })
              }
              onKeyDown={(event) => event.code === "Enter" && onAddPaciente()}
            />
          </Grid>
          <Grid item={true}>
            <IconButton size={"small"} onClick={onAddPaciente}>
              <CheckOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        {pacientesLoading ? (
          <Loading size={20} />
        ) : (
          pacientes &&
          pacientes.map((paciente: TipoPaciente, k: number) => (
            <PacienteModalItem
              key={paciente.id}
              paciente={paciente}
              onDeletePaciente={onDeletePaciente}
              onUpdatePaciente={onUpdatePaciente}
            />
          ))
        )}
      </DialogContent>
    </Dialog>
  );
  return (
    <>
      {renderModal}
      <NavigationItem
        name={"Altera pacientes"}
        onClick={() => setOpen((prevState) => !prevState)}
        icon={<EditOutlinedIcon />}
      />

      {renderModalP}
      <NavigationItem
        name={"Pacientes"}
        onClick={() => setOpenP((prevStateP) => !prevStateP)}
        icon={<PersonSearch />}
      />
    </>
  );
};

export default React.memo(PacientesModal);
