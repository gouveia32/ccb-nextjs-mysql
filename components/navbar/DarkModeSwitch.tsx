import { useContext } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Switch from "react-switch";

import { ThemeContext } from "../../context/ThemeContext";

interface DrakModeSwitchProps {}

const DarkModeSwitch: React.FC<DrakModeSwitchProps> = ({}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme === "DARK"}
      onChange={() => toggleTheme(theme)}
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <BsSun color="#FFD700" />
        </div>
      }
      onColor="#ccc6c6"
      offColor="#111010"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <BsMoon color="#fff" />
        </div>
      }
    />
  );
};

export default DarkModeSwitch;
