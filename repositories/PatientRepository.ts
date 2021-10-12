import { Tag, Patient, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { PatientType } from "../models/Patient";
import prisma from "../lib/prisma";



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
 export const getPatientById = async (id: string): Promise<Patient> => {
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
