import React from "react";
import {cControle, TipoControle} from "../../../models/ControleObject";
import {Checkbox} from "@material-ui/core";
import {NotaCardCheckItemCheck, NotaCardCheckItemComponent, NotaCardCheckItemText,} from "./nota-card-checkitem.styles";

export interface NotaCardCheckItemProps {
  checkItem: TipoControle;
  onChecked?: (checkItem: TipoControle) => void;
}

const NotaCardCheckItem: React.FC<NotaCardCheckItemProps> = ({
  checkItem,
  onChecked,
}: NotaCardCheckItemProps) => {
  const handleChange = (attr: string, event: any) => {
    const newCheckItem: any = { ...checkItem };

    newCheckItem[attr] = event.target.checked;

    onChecked && onChecked(newCheckItem);
  };

  return (
    <NotaCardCheckItemComponent>
      <NotaCardCheckItemCheck>
        <Checkbox
          size={"small"}
          color={"default"}
          checked={checkItem.marcado}
          className="p-1"
          onChange={(event) => handleChange(cControle.marcado, event)}
          onClick={(event) => event.stopPropagation()}
        />
      </NotaCardCheckItemCheck>
      <NotaCardCheckItemText checked={checkItem.marcado}>
        {checkItem.texto}
      </NotaCardCheckItemText>
    </NotaCardCheckItemComponent>
  );
};

export default NotaCardCheckItem;
