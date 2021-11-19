export interface DoctorModel {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export type DoctorType = DoctorModel;

export const cDoctorModel = {
  id: "id",
  name: "name",
  email: "email",
  image: '',
};

export const DoctorObject: DoctorType = {
  id: "",
  name: "",
  email: "",
  image: '',
};

export function isDoctorType(object: any): object is DoctorType {
  return "name" in object;
}
