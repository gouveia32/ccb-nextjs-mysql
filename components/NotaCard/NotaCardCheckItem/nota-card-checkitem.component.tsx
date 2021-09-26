import React from "react";
import {cCheckPoint, CheckPointType} from "../../../models/ControleObject";
import {Checkbox} from "@material-ui/core";
import {NotaCardCheckItemCheck, NotaCardCheckItemComponent, NotaCardCheckItemText,} from "./nota-card-checkitem.styles";

export interface NotaCardCheckItemProps {
  checkItem: CheckPointType;
  onChecked?: (checkItem: CheckPointType) => void;
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
          checked={checkItem.checked}
          className="p-1"
          onChange={(event) => handleChange(cCheckPoint.checked, event)}
          onClick={(event) => event.stopPropagation()}
        />
      </NotaCardCheckItemCheck>
      <NotaCardCheckItemText checked={checkItem.checked}>
        {checkItem.text}
      </NotaCardCheckItemText>
    </NotaCardCheckItemComponent>
  );
};

export default NotaCardCheckItem;
