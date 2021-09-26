import { Paciente } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../lib/RestAPI";
import { deletePaciente } from "../../../repositories/PacienteRepository";

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
      query: { id },
      method,
    } = req;

    switch (method) {
      case cRestMethods.DELETE:
        await deletePaciente(id as string);
        res.status(200).json({ message: "Paciente deleted." });
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
