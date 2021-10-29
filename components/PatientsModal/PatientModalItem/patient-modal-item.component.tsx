import React, { useCallback, useEffect, useRef, useState } from "react";
import { PatientType } from "../../../models/Patient";
import { Grid, IconButton, TextField } from "@material-ui/core";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

export interface PatientModalItemProps {
  patient: PatientType;
  onDeletePatient: (patient: PatientType) => void;
  onUpdatePatient: (patient: PatientType) => void;
}

const PatientModalItem: React.FC<PatientModalItemProps> = ({
  patient,
  onDeletePatient,
  onUpdatePatient,
}: PatientModalItemProps) => {
  const [edit, setEdit] = useState(false);

  const [updatePatient, setUpdatePatient] = useState(patient);

  const patientItemRef = useRef(null);

  const clickOutsideListener = useCallback(
    (e: MouseEvent) => {
      if (
        patientItemRef.current &&
        !(patientItemRef.current as any).contains(e.target)
      ) {
        setEdit(false);
      }
    },
    [patientItemRef]
  );

  useEffect(() => {
    document.addEventListener("click", clickOutsideListener);
    return () => {
      document.removeEventListener("click", clickOutsideListener);
    };
  }, [clickOutsideListener]);

  const handleOnChange = (value: string) => {
    setUpdatePatient((prevState) => {
      const newPatient = Object.assign({}, prevState);
      newPatient.name = value;
      return newPatient;
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
        <h5 className="m-0 ms-2">{patient.name}</h5>
      </Grid>
      <Grid item={true}>
        <IconButton
          size={"small"}
          onClick={(event) => {
            onDeletePatient(patient);
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
        <IconButton size={"small"} onClick={() => onDeletePatient(patient)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid item={true} style={{ flex: 1 }}>
        <TextField
          value={updatePatient.name}
          fullWidth={true}
          size={"small"}
          variant={"standard"}
          onChange={(event) => handleOnChange(event.target.value)}
          onKeyDown={(event) =>
            event.code === "Enter" && onUpdatePatient(updatePatient)
          }
        />
      </Grid>
      <Grid item={true}>
        <IconButton size={"small"} onClick={() => onUpdatePatient(updatePatient)}>
          <CheckOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  return <div ref={patientItemRef}>{edit ? renderEditItems : renderItems}</div>;
};

export default React.memo(PatientModalItem);
