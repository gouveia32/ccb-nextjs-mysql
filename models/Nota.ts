import { TipoPaciente } from "./Paciente";
import { TipoControle } from "./ControleObject";
import { Nota } from "@prisma/client";

export enum tipoNotaEnum {
  CHECK = "CHECK",
  TEXT = "TEXT",
}

export interface NotaModel {
  id?: string;
  nome: string;
  tipoNota: tipoNotaEnum;
  conteudo: string;
  cor: string;
  pino: boolean;
  criadoEm: string;
  pacientes: TipoPaciente[];
  controles?: TipoControle[];
}

export type TipoNota = NotaModel;

export const NotaObject: TipoNota = {
  id: "",
  nome: "",
  tipoNota: tipoNotaEnum.TEXT,
  conteudo: "",
  cor: "#fff",
  pino: false,
  criadoEm: new Date(Date.now()).toString(),
  pacientes: [],
  controles: [],
};

export const NotaDBObject: Nota = {
  id: "",
  nome: "",
  tipoNota: "TEXT",
  cor: "",
  conteudo: "",
  pino: false,
  criadoEm: new Date(Date.now()),
  medicoId: "",
};

export enum cNotaModel {
  id = "id",
  nome = "nome",
  tipoNota = "tipoNota",
  cor = "cor",
  conteudo = "conteudo",
  pino = "pino",
  criadoEm = "criadoEm",
  pacientes = "pacientes",
  controles = "controles",
}
