export interface PatientModel {
  id: string;
  name: string;
  email: string;
  telephone: string;
  heigth: number;
  weigth: number;
}

export type PatientType = PatientModel;

export const cPatientModel = {
  id: "id",
  name: "name",
  email: "email",
  telephone: "telephone",
  heigth: "heigth",
  weigth: "weigth",
};

export const PatientObject: PatientType = {
  id: "",
  name: "",
  email: "",
  telephone: "",
  heigth: 0,
  weigth: 0,
};

export function isPatientType(object: any): object is PatientType {
  return "name" in object;
}
