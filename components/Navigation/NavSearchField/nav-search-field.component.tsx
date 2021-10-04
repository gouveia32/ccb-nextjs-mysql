import React, { useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import {
  NavSearchFieldButton,
  NavSearchFieldComponent,
} from "./nav-search-field.styles";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import Link from "next/link";
import { PageLinks } from "../../../lib/Links";

export interface NavSearchFieldProps {
  onSearch: (query: string) => void;
  value: string;
}

const NavSearchField: React.FC<NavSearchFieldProps> = ({
  onSearch,
  value,
}: NavSearchFieldProps) => {
  const [showOnMobile, setShowOnMobile] = useState(false);

  return (
    <>
      <NavSearchFieldButton>
        <IconButton onClick={() => setShowOnMobile((prevState) => !prevState)}>
          <SearchIcon />
        </IconButton>
      </NavSearchFieldButton>
      <NavSearchFieldComponent
        showOnMobile={showOnMobile}
        onBlur={() => setShowOnMobile(false)}
      >
        <TextField
          onChange={(event) => onSearch(event.target.value)}
          size={"small"}
          fullWidth={false}
          className="w-90 search-input"
          placeholder={"Procure por notas"}
          value={value}
          InputProps={{
            startAdornment: <SearchIcon fontSize={"small"} className="me-2" />,
            endAdornment: value.length > 0 && (
              <IconButton size={"small"} onClick={() => onSearch("")}>
                <ClearIcon />
              </IconButton>
            ),
              disableUnderline: true
          }}
        />
      </NavSearchFieldComponent>
      
    </>
  );
};

export default NavSearchField;
