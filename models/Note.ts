import { PacienteType } from "./Paciente";
import { CheckPointType } from "./CheckPointObject";
import { Note } from "@prisma/client";

export enum NoteTypeEnum {
  CHECK = "CHECK",
  TEXT = "TEXT",
}

export interface NoteModel {
  id?: string;
  name: string;
  noteType: NoteTypeEnum;
  content: string;
  color: string;
  pinned: boolean;
  createdAt: string;
  pacientes: PacienteType[];
  checkPoints?: CheckPointType[];
}

export type NoteType = NoteModel;

export const NoteObject: NoteType = {
  id: "",
  name: "",
  noteType: NoteTypeEnum.TEXT,
  content: "",
  color: "#fff",
  pinned: false,
  createdAt: new Date(Date.now()).toString(),
  pacientes: [],
  checkPoints: [],
};

export const NoteDBObject: Note = {
  id: "",
  name: "",
  noteType: "TEXT",
  color: "",
  content: "",
  pinned: false,
  createdAt: new Date(Date.now()),
  medicoId: "",
};

export enum cNoteModel {
  id = "id",
  name = "name",
  noteType = "noteType",
  color = "color",
  content = "content",
  pinned = "pinned",
  createdAt = "createdAt",
  pacientes = "pacientes",
  checkPoints = "checkPoints",
}
