import { Doctor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getAllDoctors } from "../../../repositories/DoctorRepository";
import { cRestMethods } from "../../../lib/RestAPI";
import {
  addNewDoctor,
  getAllDoctorDoctors,
  updateDoctor,
} from "../../../repositories/DoctorRepository";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Doctor[]>
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
        const doctorDoctors = await getAllDoctors();
        //console.log("Aqui:::",DoctorId)
        res.status(200).json(doctorDoctors);
        break;
      case cRestMethods.POST:
        await addNewDoctor(body);
        res.status(201).json({ message: "Médico Inserido." });
        break;
      case cRestMethods.PUT:
        await updateDoctor(JSON.parse(body));
        res.status(200).json({ message: "Médico alterado." });
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
