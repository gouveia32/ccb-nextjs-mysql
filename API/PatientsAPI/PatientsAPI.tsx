import * as React from "react";

type SetValue = (value: any) => void;

interface AppContextInterface {
  patient: any;
  setPatient: SetValue;
}

export const SimpleCtx = React.createContext<AppContextInterface | null>(null);

const CtxProvider: React.FC = props => {
  const [patient, setPatient] = React.useState(null);
  return (
    <SimpleCtx.Provider
      value={{
        patient,
        setPatient
      }}
    >
      {props.children}
    </SimpleCtx.Provider>
  );
};

export default CtxProvider;