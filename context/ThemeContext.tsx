import React from "react";

import { ThemeType } from "./theme";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme(theme: ThemeType): void;
};

export const ThemeContext = React.createContext<null | ThemeContextType>(null);
