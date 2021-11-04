import { Patient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getAllPatients } from "../../../repositories/PatientRepository";
import { cRestMethods } from "../../../lib/RestAPI";
import {
  addNewPatient,
  getAllDoctorPatients,
  updatePatient,
} from "../../../repositories/PatientRepository";

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
      query: { id, name },
      method,
      body,
    } = req;
    //console.log("query:",session)

    switch (method) {
      case cRestMethods.GET:
        const doctorPatients = await getAllPatients();
        //console.log("Aqui:::",patientId)
        res.status(200).json(doctorPatients);
        break;
      case cRestMethods.POST:
        await addNewPatient(body);
        res.status(201).json({ message: "Paciente Inserido." });
        break;
      case cRestMethods.PUT:
        await updatePatient(JSON.parse(body));
        res.status(200).json({ message: "Paciente alterado." });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Método ${method} Não Permitido`);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
