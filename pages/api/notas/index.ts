import { Nota } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  addNewNota,
  getAllMedicoNotas,
  updateNota,
} from "../../../repositories/NotaRepository";
import { cRestMethods } from "../../../lib/RestAPI";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Nota[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { id, nome },
      method,
      body,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const medicoNotas = await getAllMedicoNotas(session);
        res.status(200).json(medicoNotas);
        break;
      case cRestMethods.POST:
        await addNewNota(body, session);
        res.status(201).json({ message: "Nota criada." });
        break;
      case cRestMethods.PUT:
        await updateNota(JSON.parse(body));
        res.status(200).json({ message: "Nota alterada." });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Método ${method} Não éPermitido`);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
