export interface PacienteModel {
  id: string;
  name: string;
}

export type PacienteType = PacienteModel;

export const cPacienteModel = {
  id: "id",
  name: "name"
};

export const PacienteObject: PacienteType = {
  id: "",
  name: "",
};

export function isPacienteType(object: any): object is PacienteType {
  return "name" in object;
}
