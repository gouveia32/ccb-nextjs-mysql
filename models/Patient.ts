export interface PatientModel {
  id: string;
  name: string;
}

export type PatientType = PatientModel;

export const cPatientModel = {
  id: "id",
  name: "name"
};

export const PatientObject: PatientType = {
  id: "",
  name: "",
};

export function isPatientType(object: any): object is PatientType {
  return "name" in object;
}
