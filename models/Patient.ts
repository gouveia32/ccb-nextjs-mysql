export interface PatientModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  logradoro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep:  string;
  height: number;
  weight: number;
  image?: string;
}

export type PatientType = PatientModel;

export const cPatientModel = {
  id: "id",
  name: "name",
  email: "email",
  phone: "phone",
  logradoro: 'logradoro',
  numero: 'numero',
  bairro: 'bairro',
  municipio: 'municipio',
  uf: 'uf',
  cep:  'cep',
  height: "height",
  weight: "weight",
  image: '',
};

export const PatientObject: PatientType = {
  id: "",
  name: "",
  email: "",
  phone: "",
  logradoro: '',
  numero: '',
  bairro: '',
  municipio: '',
  uf: '',
  cep:  '',
  height: 0,
  weight: 0,
  image: '',
};

export function isPatientType(object: any): object is PatientType {
  return "name" in object;
}
