import { Note, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { NoteType } from "../models/Note";
import { TagType } from "../models/Tag";
import { CheckPointType } from "../models/CheckPointObject";
import prisma from "../lib/prisma";


/**
 * Get all searchNotes of current signed doctor
 * @param doctorSession - session object of current doctor
 * @param patientId - ID of tag to search for tags notes
 */
export const getAllDoctorNotes = async (
  doctorSession: Session ,
  patientId: string
): Promise<Note[]> => {
    //console.log("doctorSession:",doctorSession);
  const patient =  await prisma.patient.findFirst({
    where: { id: patientId },
    include: {
      notes: {
        include: {
          tags: true,
          checkPoints: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (patient) {
    return patient.notes;
  } else {
    return [];
  }
};

/**
 * Search searchNotes of current signed doctor
 * @param query
 * @param doctorSession - session object of current doctor
 * @param tagId - ID of tag to search for tags notes
 */
export const searchNotes = async (
  query: string,
  doctorSession: Session,
  tagId?: string,
  patientId?: string
): Promise<Note[]> => {
  console.log("query-search-query:",query)
  console.log("query-search-tagId:",tagId)
  console.log("query-search-patientId:",patientId)
  const doctor = tagId
    ? await prisma.doctor.findFirst({
        where: { name: doctorSession?.user?.name },
        include: {
          notes: {
            where: {
              name: {
                contains: query,
              },
              tags: {
                some: {
                  id: tagId,
                },
              },
            },
            include: {
              tags: true,
              checkPoints: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })
    : await prisma.doctor.findFirst({
        where: { name: doctorSession?.user?.name },
        include: {
          notes: {
            where: {
              name: {
                contains: query,
              },
            },
            include: {
              tags: true,
              checkPoints: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
  if (doctor) {
    return doctor.notes;
  } else {
    return [];
  }
};

/**
 * Add new note for currently signed doctor
 * @param note - note object to add
 * @param doctorSession - session object of current doctor
 */
export const addNewNote = async (
  note: NoteType,
  doctorSession: Session,
  patientId: string
): Promise<Note | undefined> => {
  const patient = await prisma.patient.findFirst({
    where: { id: patientId },
  });

  if (patient) {
    const tags: any[] = note.tags.map((tag: TagType) => ({
      id: tag.id,
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
        tags: {
          connect: [...tags],
        },
        checkPoints: {
          create: [...checkPoints],
        },
        patient: {
          connect: {
            id: patient.id,
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
  const tags: any[] = note.tags.map((tag: TagType) => ({
    id: tag.id,
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
    include: { tags: true },
  });

  const oldTags: any[] = oldNote.tags.map((tag: TagType) => ({
    id: tag.id,
  }));

  return await prisma.note.update({
    where: { id: note.id },
    data: {
      name: note.name,
      content: note.content,
      noteType: note.noteType,
      color: note.color,
      pinned: note.pinned,
      tags: {
        disconnect: [...oldTags],
        connect: [...tags],
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
