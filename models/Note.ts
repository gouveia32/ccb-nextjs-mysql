import { TagType } from "./Tag";
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
  tags: TagType[];
  checkPoints?: CheckPointType[];
  patientId: string;
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
  tags: [],
  checkPoints: [],
  patientId: "",
};


export enum cNoteModel {
  id = "id",
  name = "name",
  noteType = "noteType",
  color = "color",
  content = "content",
  pinned = "pinned",
  createdAt = "createdAt",
  tags = "tags",
  checkPoints = "checkPoints",
  patientId = "patientId:", 
}
