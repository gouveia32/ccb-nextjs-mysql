import { Nota } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../../lib/RestAPI";
import { getPacienteNotas } from "../../../../repositories/PacienteRepository";

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
      query: { id },
      method,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const pacienteNotas: Nota[] = await getPacienteNotas(id as string);
        res.status(200).json(pacienteNotas);
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
