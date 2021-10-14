import * as React from "react";

type SetValue = (value: any) => void;
interface AppContextInterface {
  valueA: any;
  setValueA: SetValue;
}

export const SimpleCtx = React.createContext<AppContextInterface | null>(null);

const CtxProvider: React.FC = props => {
  const [valueA, setValueA] = React.useState(null);
  return (
    <SimpleCtx.Provider
      value={{
        valueA,
        setValueA
      }}
    >
      {props.children}
    </SimpleCtx.Provider>
  );
};

export default CtxProvider;