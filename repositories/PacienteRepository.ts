import { PrismaClient, Paciente } from "@prisma/client";
import { Session } from "next-auth";
import { PacienteType } from "../models/Paciente";
import prisma from "../lib/prisma";

export const getAllPacientes = async (userSession: Session): Promise<Paciente[]> => {
  const pacientes = await prisma.paciente.findMany({});
  console.log("pacientes:",pacientes)
  
  if (userSession) {
    return pacientes;
  } else {
    return [];
  }
};

/**
 * Add new tag for current logged user
 * @param tag - tag to add
 * @param userSession - session object of current user
 */
 export const addNewPaciente = async (
  paciente: Paciente,
  userSession: Session
): Promise<Paciente | undefined> => {

  if (userSession) {
    const newPaciente = await prisma.paciente.create({
      data: {
        nome: paciente.nome,
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
      nome: paciente.nome,
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
