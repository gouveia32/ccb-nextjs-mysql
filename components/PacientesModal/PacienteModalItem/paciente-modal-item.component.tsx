import React, { useCallback, useEffect, useRef, useState } from "react";
import { PacienteType } from "../../../models/Paciente";
import { Grid, IconButton, TextField } from "@material-ui/core";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

export interface PacienteModalItemProps {
  paciente: PacienteType;
  onDeletePaciente: (paciente: PacienteType) => void;
  onUpdatePaciente: (paciente: PacienteType) => void;
}

const PacienteModalItem: React.FC<PacienteModalItemProps> = ({
  paciente,
  onDeletePaciente,
  onUpdatePaciente,
}: PacienteModalItemProps) => {
  const [edit, setEdit] = useState(false);

  const [updatePaciente, setUpdatePaciente] = useState(paciente);

  const pacienteItemRef = useRef(null);

  const clickOutsideListener = useCallback(
    (e: MouseEvent) => {
      if (
        pacienteItemRef.current &&
        !(pacienteItemRef.current as any).contains(e.target)
      ) {
        setEdit(false);
      }
    },
    [pacienteItemRef]
  );

  useEffect(() => {
    document.addEventListener("click", clickOutsideListener);
    return () => {
      document.removeEventListener("click", clickOutsideListener);
    };
  }, [clickOutsideListener]);

  const handleOnChange = (value: string) => {
    setUpdatePaciente((prevState) => {
      const newPaciente = Object.assign({}, prevState);
      newPaciente.name = value;
      return newPaciente;
    });
  };

  const renderItems = (
    <Grid
      container={true}
      className="py-2 cursor-pointer"
      onClick={(e) => {
        setEdit(true);
        e.stopPropagation();
      }}
    >
      <Grid item={true}>
        <LabelOutlinedIcon />
      </Grid>
      <Grid item={true} style={{ flex: 1 }}>
        <h5 className="m-0 ms-2">{paciente.name}</h5>
      </Grid>
      <Grid item={true}>
        <IconButton
          size={"small"}
          onClick={(event) => {
            onDeletePaciente(paciente);
            event.stopPropagation();
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  const renderEditItems = (
    <Grid container={true} className="py-2">
      <Grid item={true}>
        <IconButton size={"small"} onClick={() => onDeletePaciente(paciente)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid item={true} style={{ flex: 1 }}>
        <TextField
          value={updatePaciente.name}
          fullWidth={true}
          size={"small"}
          variant={"standard"}
          onChange={(event) => handleOnChange(event.target.value)}
          onKeyDown={(event) =>
            event.code === "Enter" && onUpdatePaciente(updatePaciente)
          }
        />
      </Grid>
      <Grid item={true}>
        <IconButton size={"small"} onClick={() => onUpdatePaciente(updatePaciente)}>
          <CheckOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  return <div ref={pacienteItemRef}>{edit ? renderEditItems : renderItems}</div>;
};

export default React.memo(PacienteModalItem);
