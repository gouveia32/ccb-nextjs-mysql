import { Tag, Patient, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { PatientType } from "../models/Patient";
import prisma from "../lib/prisma";


/**
 * Get all patients of current signed doctor
 * 
 */
export const getAllPatients = async (): Promise<Patient[]> => {

  const patients = await prisma.patient.findMany({
    orderBy: {
      createdAt: "asc",
    }
  });
  //console.log("doctor:",doctor);
  if (patients) {
    return patients;
  } else {
    return [];
  }
};

/**
 * Get all patients of current signed doctor
 * @param doctorSession - session object of current doctor
 */
export const getAllDoctorPatients = async (doctorSession: Session): Promise<Patient[]> => {

  const doctor = await prisma.doctor.findFirst({
    where: { name: doctorSession?.user?.name },
    include: {
      patients: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  //console.log("doctor:",doctor);
  if (doctor) {
    return doctor.patients;
  } else {
    return [];
  }
};


/**
 * Get patient bt Id
 * @param id - session object of current doctor
 */
export const getPatientById = async (id: string): Promise<Patient[]> => {
  return await prisma.patient.findFirst({
    where: { id: id },
  });
};

/**
 * Get first patient
 * 
 */
export const getFirstPatient = async (): Promise<Patient> => {
  return await prisma.patient.findFirst();
};


/**
 * Search searchPatients of current signed doctor
 * @param query
 */
export const searchPatients = async (
  query: string,
  id?: string
): Promise<Patient[]> => {
  const patients = await prisma.patient.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    orderBy: {
      createdAt: "asc",
    }
  });
  //console.log("doctor:",doctor);
  if (patients) {
    return patients;
  } else {
    return [];
  }
};

/**
 * Add new tag for current logged doctor
 * @param patient - tag to add
 */
export const addNewPatient = async (
  patient: Patient,
): Promise<Patient | undefined> => {

  const newPatient = await prisma.patient.create({
    data: {
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      logradoro: patient.logradoro,
      numero: patient.numero,
      bairro: patient.bairro,
      municipio: patient.municipio,
      uf: patient.uf,
      cep: patient.cep,
      height: patient.height,
      weight: patient.weight,
      image: patient.image,
    },
  });
  return newPatient;
};

/**
 * Update given Patient
 * @param patient
 */
export const updatePatient = async (patient: PatientType): Promise<Patient | undefined> => {
  return await prisma.patient.update({
    where: {
      id: patient.id,
    },
    data: {
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      logradoro: patient.logradoro,
      numero: patient.numero,
      bairro: patient.bairro,
      municipio: patient.municipio,
      uf: patient.uf,
      cep: patient.cep,
      height: patient.height,
      weight: patient.weight,
      image: patient.image,
    },
  });
};


/**
 * Delete patient by ID
 * @param patientId
 */
export const deletePatient = async (patientId: string) => {
  await prisma.note.deleteMany({
    where: { patientId: patientId },
  });

  return await prisma.patient.delete({ where: { id: patientId } });
};
