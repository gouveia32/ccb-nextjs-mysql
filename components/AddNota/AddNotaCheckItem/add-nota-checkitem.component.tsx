import React from "react";
import {Checkbox, IconButton, makeStyles, TextField} from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import {AddNotaCheckItem, AddNotaCheckItemText,} from "./add-nota-checkItem.styles";
import {cControle, TipoControle} from "../../../models/ControleObject";

const useStyles = makeStyles({
  root: {
    textDecoration: "line-through",
  },
});

export interface NotaCheckItemProps {
  checkItem: TipoControle;
  onHandleChange: (checkItem: TipoControle) => void;
  onDelete: (id: number) => void;
}

const NotaCheckItem: React.FC<NotaCheckItemProps> = ({
  checkItem,
  onHandleChange,
  onDelete,
}: NotaCheckItemProps) => {
  const classes = useStyles();

  const handleChange = (attr: string, val: any) => {
    const newCheckItem: any = { ...checkItem };
    newCheckItem[attr] = val;
    onHandleChange(newCheckItem);
  };

  return (
    <AddNotaCheckItem>
      <Checkbox
        onChange={(e) => handleChange(cControle.marcado, e.target.checked)}
        onClick={(event) => event.stopPropagation()}
        checked={checkItem.marcado}
        size={"small"}
        color={"default"}
      />
      <AddNotaCheckItemText>
        <TextField
          onChange={(event) =>
            handleChange(cControle.texto, event.target.value)
          }
          fullWidth={true}
          placeholder={"Write something..."}
          value={checkItem.texto}
          classes={{
            root: checkItem.marcado ? classes.root : "",
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
      </AddNotaCheckItemText>
    </AddNotaCheckItem>
  );
};

export default NotaCheckItem;
