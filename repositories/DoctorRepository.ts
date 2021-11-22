import { Doctor, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { DoctorType } from "../models/Doctor";
import prisma from "../lib/prisma";


/**
 * Get all doctors of current signed doctor
 * 
 */
export const getAllDoctors = async (): Promise<Doctor[]> => {

  const doctors = await prisma.doctor.findMany({
    orderBy: {
      createdAt: "asc",
    }
  });
  //console.log("doctor:",doctor);
  if (doctors) {
    return doctors;
  } else {
    return [];
  }
};

/**
 * Get all doctors of current signed doctor
 * @param doctorSession - session object of current doctor
 */
export const getAllDoctorDoctors = async (doctorSession: Session): Promise<Doctor[]> => {

  const doctor = await prisma.doctor.findFirst({
    where: { name: doctorSession?.user?.name },
    include: {
      doctors: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  //console.log("doctor:",doctor);
  if (doctor) {
    return doctor.doctors;
  } else {
    return [];
  }
};


/**
 * Get doctor bt Id
 * @param id - session object of current doctor
 */
export const getDoctorById = async (id: string): Promise<Doctor[]> => {
  return await prisma.doctor.findFirst({
    where: { id: id },
  });
};


/**
 * Get doctor bt Id
 * @param id - session object of current doctor
 */
 export const getDoctorByName = async (name: string): Promise<Doctor[]> => {
  return await prisma.doctor.findFirst({
    where: { name: name },
  });
};
/**
 * Get first doctor
 * 
 */
export const getFirstDoctor = async (): Promise<Doctor> => {
  return await prisma.doctor.findFirst();
};


/**
 * Search searchDoctors of current signed doctor
 * @param query
 */
export const searchDoctors = async (
  query: string,
  id?: string
): Promise<Doctor[]> => {
  const doctors = await prisma.doctor.findMany({
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
  if (doctors) {
    return doctors;
  } else {
    return [];
  }
};

/**
 * Add new tag for current logged doctor
 * @param doctor - tag to add
 */
export const addNewDoctor = async (
  doctor: Doctor,
): Promise<Doctor | undefined> => {

  const newDoctor = await prisma.doctor.create({
    data: {
      name: doctor.name,
      email: doctor.email,
      image: doctor.image,
    },
  });
  return newDoctor;
};

/**
 * Update given Doctor
 * @param doctor
 */
export const updateDoctor = async (doctor: DoctorType): Promise<Doctor | undefined> => {
  return await prisma.doctor.update({
    where: {
      id: doctor.id,
    },
    data: {
      name: doctor.name,
      email: doctor.email,
      image: doctor.image,
    },
  });
};


/**
 * Delete doctor by ID
 * @param doctorId
 */
export const deleteDoctor = async (doctorId: string) => {
  await prisma.note.deleteMany({
    where: { doctorId: doctorId },
  });

  return await prisma.doctor.delete({ where: { id: doctorId } });
};
