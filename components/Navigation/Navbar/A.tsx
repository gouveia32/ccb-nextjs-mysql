import * as React from "react";
import { PatientCtx } from '../../AppContext/Context';
import { useContext } from "react";


const A = () => {
  const { patient, setPatient } = useContext(PatientCtx);
  return (
    <div>
      <div>value: {patient}</div>
      <input onChange={e => setPatient(e.target.value)} />
    </div>
  );
};
export default A;