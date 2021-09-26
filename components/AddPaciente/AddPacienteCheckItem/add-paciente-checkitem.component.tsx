import React from "react";
import {Checkbox, IconButton, makeStyles, TextField} from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import {AddPacienteCheckItem, AddPacienteCheckItemText,} from "./add-paciente-checkItem.styles";
import {cCheckPoint, CheckPointType} from "../../../models/ControleObject";

const useStyles = makeStyles({
  root: {
    textDecoration: "line-through",
  },
});

export interface PacienteCheckItemProps {
  checkItem: CheckPointType;
  onHandleChange: (checkItem: CheckPointType) => void;
  onDelete: (id: number) => void;
}

const PacienteCheckItem: React.FC<PacienteCheckItemProps> = ({
  checkItem,
  onHandleChange,
  onDelete,
}: PacienteCheckItemProps) => {
  const classes = useStyles();

  const handleChange = (attr: string, val: any) => {
    const newCheckItem: any = { ...checkItem };
    newCheckItem[attr] = val;
    onHandleChange(newCheckItem);
  };

  return (
    <AddPacienteCheckItem>
      <Checkbox
        onChange={(e) => handleChange(cCheckPoint.checked, e.target.checked)}
        onClick={(event) => event.stopPropagation()}
        checked={checkItem.checked}
        size={"small"}
        color={"default"}
      />
      <AddPacienteCheckItemText>
        <TextField
          onChange={(event) =>
            handleChange(cCheckPoint.text, event.target.value)
          }
          fullWidth={true}
          placeholder={"Write something..."}
          value={checkItem.text}
          classes={{
            root: checkItem.checked ? classes.root : "",
          }}
          autoFocus={true}
        />
        <IconButton
            id={"clear-button"}
          size={"small"}
          onClick={(event) => {
            onDelete(checkItem.id as number);
            event.stopPropagation();
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      </AddPacienteCheckItemText>
    </AddPacienteCheckItem>
  );
};

export default PacienteCheckItem;
