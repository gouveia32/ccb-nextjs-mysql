import React, { useState } from "react";
import { CirclePicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";
import { IconButton } from "@material-ui/core";
import { ColorPickerContent, ColorPickerMain } from "./color-picker.styles";

export interface ColorPickerProps {
  onChooseColor: (color: string) => void;
  edit?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onChooseColor,
  edit,
}: ColorPickerProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const renderPicker = (
    <ColorPickerContent edit={edit} onMouseLeave={() => onChooseColor("#fff")}>
      <CirclePicker
        onSwatchHover={(color) => onChooseColor(color.hex)}
        onChangeComplete={(color) => {
          onChooseColor(color.hex);
          setPickerOpen(false);
        }}
      />
    </ColorPickerContent>
  );

  return (
    <ColorPickerMain>
      {pickerOpen && renderPicker}
      <IconButton size={"small"} onClick={() => setPickerOpen(!pickerOpen)}>
        <PaletteIcon />
      </IconButton>
    </ColorPickerMain>
  );
};

export default ColorPicker;
