import { Paciente } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../lib/RestAPI";
import {
  addNewPaciente,
  getAllPacientes,
  updatePaciente,
} from "../../../repositories/PacienteRepository";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Paciente[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { id, name },
      method,
      body,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const userPacientes = await getAllPacientes(session);
        res.status(200).json(userPacientes);
        break;
      case cRestMethods.POST:
        await addNewPaciente(body, session);
        res.status(201).json({ message: "Paciente created." });
        break;
      case cRestMethods.PUT:
        await updatePaciente(JSON.parse(body));
        res.status(200).json({ message: "Paciente updated." });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
