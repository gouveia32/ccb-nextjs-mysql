import { Nota, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { TipoNota } from "../models/Nota";
import { TipoPaciente } from "../models/Paciente";
import prisma from "../lib/prisma";
import { TipoControle } from "../models/ControleObject";

/**
 * Get all searchNotas of current signed medico
 * @param medicoSession - session object of current medico
 */
export const getAllMedicoNotas = async (
  medicoSession: Session
): Promise<Nota[]> => {
  const medico = await prisma.medico.findFirst({
    where: { nome: medicoSession?.user?.name },
    include: {
      notas: {
        include: {
          pacientes: true,
          controles: true,
        },
        orderBy: {
          criadoEm: "asc",
        },
      },
    },
  });
  if (medico) {
    return medico.notas;
  } else {
    return [];
  }
};

/**
 * Search searchNotas of current signed medico
 * @param query
 * @param medicoSession - session object of current medico
 * @param pacienteId - ID of paciente to search for pacientes notas
 */
export const searchNotas = async (
  query: string,
  medicoSession: Session,
  pacienteId?: string
): Promise<Nota[]> => {
  const medico = pacienteId
    ? await prisma.medico.findFirst({
        where: { nome: medicoSession?.user?.name },
        include: {
          notas: {
            where: {
              nome: {
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
              controles: true,
            },
            orderBy: {
              criadoEm: "asc",
            },
          },
        },
      })
    : await prisma.medico.findFirst({
        where: { nome: medicoSession?.user?.name },
        include: {
          notas: {
            where: {
              nome: {
                contains: query,
              },
            },
            include: {
              pacientes: true,
              controles: true,
            },
            orderBy: {
              criadoEm: "asc",
            },
          },
        },
      });
  if (medico) {
    return medico.notas;
  } else {
    return [];
  }
};

/**
 * Add new nota for currently signed medico
 * @param nota - nota object to add
 * @param medicoSession - session object of current medico
 */
export const addNewNota = async (
  nota: TipoNota,
  medicoSession: Session
): Promise<Nota | undefined> => {
  const medico = await prisma.medico.findFirst({
    where: { nome: medicoSession?.user?.name },
  });

  if (medico) {
    const pacientes: any[] = nota.pacientes.map((paciente: TipoPaciente) => ({
      id: paciente.id,
    }));

    const controles: any = nota.controles?.map((ch: TipoControle) => ({
      texto: ch.texto,
      marcado: ch.marcado,
    }));

    const newNota = await prisma.nota.create({
      data: {
        nome: nota.nome,
        conteudo: nota.conteudo,
        tipoNota: nota.tipoNota,
        cor: nota.cor,
        pino: nota.pino,
        pacientes: {
          connect: [...pacientes],
        },
        controles: {
          create: [...controles],
        },
        medico: {
          connect: {
            id: medico.id,
          },
        },
      },
    });
    return newNota;
  }
  return undefined;
};

/**
 * Update given Nota
 * @param nota
 */
export const updateNota = async (nota: TipoNota) => {
  const pacientes: any[] = nota.pacientes.map((paciente: TipoPaciente) => ({
    id: paciente.id,
  }));

  const controles: any = nota.controles?.map((ch: TipoControle) => ({
    texto: ch.texto,
    marcado: ch.marcado,
  }));

  await prisma.controle.deleteMany({
    where: { notaId: nota.id },
  });

  const oldNota: any = await prisma.nota.findFirst({
    where: { id: nota.id },
    include: { pacientes: true },
  });

  const oldPacientes: any[] = oldNota.pacientes.map((paciente: TipoPaciente) => ({
    id: paciente.id,
  }));

  return await prisma.nota.update({
    where: { id: nota.id },
    data: {
      nome: nota.nome,
      conteudo: nota.conteudo,
      notaType: nota.tipoNota,
      cor: nota.cor,
      pino: nota.pino,
      pacientes: {
        disconnect: [...oldPacientes],
        connect: [...pacientes],
      },
      controles: {
        create: [...controles],
      },
    },
  });
};

/**
 * Delete nota by ID
 * @param notaId
 */
export const deleteNota = async (notaId: string) => {
  await prisma.controle.deleteMany({
    where: { notaId: notaId },
  });

  return await prisma.nota.delete({ where: { id: notaId } });
};
