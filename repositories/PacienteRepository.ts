import { Note, PrismaClient, Paciente } from "@prisma/client";
import { Session } from "next-auth";
import { PacienteType } from "../models/Paciente";
import prisma from "../lib/prisma";

/**
 * Get all pacientes of current signed medico
 * @param medicoSession - session object of current medico
 */
export const getAllMedicoPacientes = async (medicoSession: Session): Promise<Paciente[]> => {
  const medico = await prisma.medico.findFirst({
    where: { name: medicoSession?.medico?.name },
    include: {
      pacientes: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (medico) {
    return medico.pacientes;
  } else {
    return [];
  }
};

/**
 * Add new paciente for current logged medico
 * @param paciente - paciente to add
 * @param medicoSession - session object of current medico
 */
export const addNewPaciente = async (
  paciente: Paciente,
  medicoSession: Session
): Promise<Paciente | undefined> => {
  const medico = await prisma.medico.findFirst({
    where: { name: medicoSession?.medico?.name },
  });

  if (medico) {
    const newPaciente = await prisma.paciente.create({
      data: {
        name: paciente.name,
        medico: {
          connect: {
            id: medico.id,
          },
        },
      },
    });
    return newPaciente;
  }
  return undefined;
};

/**
 * Update given Paciente
 * @param paciente
 */
export const updatePaciente = async (paciente: PacienteType): Promise<Paciente | undefined> => {
  return await prisma.paciente.update({
    where: {
      id: paciente.id,
    },
    data: {
      name: paciente.name,
    },
  });
};

/**
 * Get all searchNotes of given paciente by its ID
 * @param pacienteId
 */
export const getPacienteNotes = async (pacienteId: string): Promise<Note[]> => {
  return await prisma.note.findMany({
    where: {
      pacientes: {
        some: { id: pacienteId },
      },
    },
    include: {
      pacientes: true,
      checkPoints: true,
    },
  });
};

/**
 * Delete Paciente by ID
 * @param pacienteId
 */
export const deletePaciente = async (pacienteId: string) => {
  return await prisma.paciente.delete({ where: { id: pacienteId } });
};
