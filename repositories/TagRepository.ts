import { Note, PrismaClient, Tag } from "@prisma/client";
import { Session } from "next-auth";
import { TagType } from "../models/Tag";
import prisma from "../lib/prisma";

/**
 * Get all tags of current signed doctor
 * @param doctorSession - session object of current doctor
 */
export const getAllDoctorTags = async (doctorSession: Session): Promise<Tag[]> => {
  const doctor = await prisma.doctor.findFirst({
    where: { name: doctorSession?.user?.name },
    include: {
      tags: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  //console.log("doctor:",doctor);
  if (doctor) {
    return doctor.tags;
  } else {
    return [];
  }
};

/**
 * Add new tag for current logged doctor
 * @param tag - tag to add
 * @param doctorSession - session object of current doctor
 */
export const addNewTag = async (
  tag: Tag,
  doctorSession: Session
): Promise<Tag | undefined> => {
  const doctor = await prisma.doctor.findFirst({
    where: { name: doctorSession?.user?.name },
  });

  if (doctor) {
    const newTag = await prisma.tag.create({
      data: {
        name: tag.name,
        doctor: {
          connect: {
            id: doctor.id,
          },
        },
      },
    });
    return newTag;
  }
  return undefined;
};

/**
 * Update given Tag
 * @param tag
 */
export const updateTag = async (tag: TagType): Promise<Tag | undefined> => {
  return await prisma.tag.update({
    where: {
      id: tag.id,
    },
    data: {
      name: tag.name,
    },
  });
};

/**
 * Get all searchNotes of given tag by its ID
 * @param tagId
 * @param patientId
 */
export const getTagNotes = async (tagId: string, patientId: string): Promise<Note[]> => {
  return await prisma.note.findMany({
    where: {
      AND: [ {
        tags: {
          some: { id: tagId },
        },
        patientId: {
          equals: patientId,
        },
      }]
    },
    include: {
      tags: true,
      checkPoints: true,
    },
  });
};

/**
 * Delete Tag by ID
 * @param tagId
 */
export const deleteTag = async (tagId: string) => {
  return await prisma.tag.delete({ where: { id: tagId } });
};
