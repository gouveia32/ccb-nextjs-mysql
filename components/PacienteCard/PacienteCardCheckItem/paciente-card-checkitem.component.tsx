import React from "react";
import {cCheckPoint, CheckPointType} from "../../../models/ControleObject";
import {Checkbox} from "@material-ui/core";
import {PacienteCardCheckItemCheck, PacienteCardCheckItemComponent, PacienteCardCheckItemText,} from "./paciente-card-checkitem.styles";

export interface PacienteCardCheckItemProps {
  checkItem: CheckPointType;
  onChecked?: (checkItem: CheckPointType) => void;
}

const PacienteCardCheckItem: React.FC<PacienteCardCheckItemProps> = ({
  checkItem,
  onChecked,
}: PacienteCardCheckItemProps) => {
  const handleChange = (attr: string, event: any) => {
    const newCheckItem: any = { ...checkItem };

    newCheckItem[attr] = event.target.checked;

    onChecked && onChecked(newCheckItem);
  };

  return (
    <PacienteCardCheckItemComponent>
      <PacienteCardCheckItemCheck>
        <Checkbox
          size={"small"}
          color={"default"}
          checked={checkItem.checked}
          className="p-1"
          onChange={(event) => handleChange(cCheckPoint.checked, event)}
          onClick={(event) => event.stopPropagation()}
        />
      </PacienteCardCheckItemCheck>
      <PacienteCardCheckItemText checked={checkItem.checked}>
        {checkItem.text}
      </PacienteCardCheckItemText>
    </PacienteCardCheckItemComponent>
  );
};

export default PacienteCardCheckItem;
