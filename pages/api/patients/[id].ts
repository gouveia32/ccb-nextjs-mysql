import { Patient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { deletePatient, searchPatients } from "../../../repositories/PatientRepository";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../lib/RestAPI";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Patient[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { id, query, tagId, patientId },
      method,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const patients: Patient[] = await searchPatients(
          query as string,
          patientId ? (patientId as string) : undefined,
        );
        //console.log("Aqui",tagId)
        res.status(200).json(patients);
        break;
      case cRestMethods.DELETE:
        await deletePatient(id as string);
        res.status(200).json({ message: "Paciente apagado." });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Metodo ${method} Não Permitido`);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
