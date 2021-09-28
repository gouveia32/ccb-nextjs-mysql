import { Note, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { NoteType } from "../models/Note";
import { PacienteType } from "../models/Paciente";
import { CheckPointType } from "../models/CheckPointObject";
import prisma from "../lib/prisma";

/**
 * Get all searchNotes of current signed medico
 * @param medicoSession - session object of current medico
 */
export const getAllMedicoNotes = async (
  medicoSession: Session
): Promise<Note[]> => {
  const medico = await prisma.medico.findFirst({
    where: { name: medicoSession?.medico?.name },
    include: {
      notes: {
        include: {
          pacientes: true,
          checkPoints: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (medico) {
    return medico.notes;
  } else {
    return [];
  }
};

/**
 * Search searchNotes of current signed medico
 * @param query
 * @param medicoSession - session object of current medico
 * @param pacienteId - ID of paciente to search for pacientes notes
 */
export const searchNotes = async (
  query: string,
  medicoSession: Session,
  pacienteId?: string
): Promise<Note[]> => {
  const medico = pacienteId
    ? await prisma.medico.findFirst({
        where: { name: medicoSession?.medico?.name },
        include: {
          notes: {
            where: {
              name: {
                contains: query,
              },
              pacientes: {
                some: {
                  id: pacienteId,
                },
              },
            },
            include: {
              pacientes: true,
              checkPoints: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })
    : await prisma.medico.findFirst({
        where: { name: medicoSession?.medico?.name },
        include: {
          notes: {
            where: {
              name: {
                contains: query,
              },
            },
            include: {
              pacientes: true,
              checkPoints: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
  if (medico) {
    return medico.notes;
  } else {
    return [];
  }
};

/**
 * Add new note for currently signed medico
 * @param note - note object to add
 * @param medicoSession - session object of current medico
 */
export const addNewNote = async (
  note: NoteType,
  medicoSession: Session
): Promise<Note | undefined> => {
  const medico = await prisma.medico.findFirst({
    where: { name: medicoSession?.medico?.name },
  });

  if (medico) {
    const pacientes: any[] = note.pacientes.map((paciente: PacienteType) => ({
      id: paciente.id,
    }));

    const checkPoints: any = note.checkPoints?.map((ch: CheckPointType) => ({
      text: ch.text,
      checked: ch.checked,
    }));

    const newNote = await prisma.note.create({
      data: {
        name: note.name,
        content: note.content,
        noteType: note.noteType,
        color: note.color,
        pinned: note.pinned,
        pacientes: {
          connect: [...pacientes],
        },
        checkPoints: {
          create: [...checkPoints],
        },
        medico: {
          connect: {
            id: medico.id,
          },
        },
      },
    });
    return newNote;
  }
  return undefined;
};

/**
 * Update given Note
 * @param note
 */
export const updateNote = async (note: NoteType) => {
  const pacientes: any[] = note.pacientes.map((paciente: PacienteType) => ({
    id: paciente.id,
  }));

  const checkPoints: any = note.checkPoints?.map((ch: CheckPointType) => ({
    text: ch.text,
    checked: ch.checked,
  }));

  await prisma.checkPoint.deleteMany({
    where: { noteId: note.id },
  });

  const oldNote: any = await prisma.note.findFirst({
    where: { id: note.id },
    include: { pacientes: true },
  });

  const oldPacientes: any[] = oldNote.pacientes.map((paciente: PacienteType) => ({
    id: paciente.id,
  }));

  return await prisma.note.update({
    where: { id: note.id },
    data: {
      name: note.name,
      content: note.content,
      noteType: note.noteType,
      color: note.color,
      pinned: note.pinned,
      pacientes: {
        disconnect: [...oldPacientes],
        connect: [...pacientes],
      },
      checkPoints: {
        create: [...checkPoints],
      },
    },
  });
};

/**
 * Delete note by ID
 * @param noteId
 */
export const deleteNote = async (noteId: string) => {
  await prisma.checkPoint.deleteMany({
    where: { noteId: noteId },
  });

  return await prisma.note.delete({ where: { id: noteId } });
};
