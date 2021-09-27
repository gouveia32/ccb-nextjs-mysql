export interface PacienteModel {
  id: string;
  nome: string;
}

export type TipoPaciente = PacienteModel;

export const cPacienteModel = {
  id: "id",
  nome: "nome"
};

export const PacienteObject: TipoPaciente = {
  id: "",
  nome: "",
};

export function isPacienteType(object: any): object is TipoPaciente {
  return "nome" in object;
}
