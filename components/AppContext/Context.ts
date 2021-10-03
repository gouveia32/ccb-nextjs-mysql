import { createContext, useContext } from 'react'
import { PatientModel } from '../../models/Patient'

interface Patient {
  id: number;
  name: string;
}

export interface PatientsContextData {
  patients: Patient[];
  isLoading: boolean;
  fetchPatients: () => void;
  removePatient: (patientId: number) => void;
}

export const patientsContextDefaultValue: PatientsContextData = {
  patients: [],
  isLoading: false,
  fetchPatients: () => null,
  removePatient: () => null
}

export const PatientsContext = createContext<PatientsContextData>(patientsContextDefaultValue);

//export default AppContext;

