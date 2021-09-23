import { TagType } from "./Tag";
import { CheckPointType } from "./CheckPointObject";
import { Paciente } from "@prisma/client";

export enum PacienteTypeEnum {
  CHECK = "CHECK",
  TEXT = "TEXT",
}

export interface PacienteModel {
  id?:              string;
  nome:             string;
  cpf:              string;
  email:            string;
  data_nascimento:  string;
  data_cadastro:    string;
  peso:             number;
  altura:           number;
  tipo_sanguineo:   string;
  status:           number;
}

export type PacienteType = PacienteModel;

export const PacienteObject: PacienteType = {
  id: "",
  nome: "",
  cpf: "",
  email: "",
  data_nascimento: "",
  data_cadastro: new Date(Date.now()).toString(),
  peso: "",
  altura: "",
  tipo_sanguineo: "",
  status: "",
};

export const PacienteDBObject: Paciente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    data_nascimento: "",
    data_cadastro: new Date(Date.now()).toString(),
    peso: "",
    altura: "",
    tipo_sanguineo: "",
    status: "",
};

export enum cPacienteModel {
  id = "id",
  nome = "nome",
  cpf: "cpf",
  email: "email",
  data_nascimento: "data_nascimento",
  data_cadastro: "data_cadastro",
  peso: ""peso,
  altura: "altura",
  tipo_sanguineo: "tipo_sanguineo",
  status: "status",
}
