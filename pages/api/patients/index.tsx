import { Patient } from ".prisma/client";
import prisma from "../../../lib/prisma";

export const selectPatient = async (
    patientId: string
  ): Promise<Patient> => {
      //console.log("doctorSession:",doctorSession);
  
    const patient = await prisma.patient.findFirst({
      where: { id: patientId },
    });
      return patient;
  };
  