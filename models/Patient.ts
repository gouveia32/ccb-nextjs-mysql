export interface PatientModel {
  id: string;
  name: string;
  email: string;
  telephone: string;
  height: number;
  weight: number;
  image?: string;
}

export type PatientType = PatientModel;

export const cPatientModel = {
  id: "id",
  name: "name",
  email: "email",
  telephone: "telephone",
  height: "height",
  weight: "weight",
  image: '',
};

export const PatientObject: PatientType = {
  id: "",
  name: "",
  email: "",
  telephone: "",
  height: 0,
  weight: 0,
  image: '',
};

export function isPatientType(object: any): object is PatientType {
  return "name" in object;
}
