import { Nota } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { deleteNota, searchNotas } from "../../../repositories/NotaRepository";
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
      query: { id, query, tagId },
      method,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const notas: Nota[] = await searchNotas(
          query as string,
          session,
          tagId ? (tagId as string) : undefined
        );
        res.status(200).json(notas);
        break;
      case cRestMethods.DELETE:
        await deleteNota(id as string);
        res.status(200).json({ message: "Nota deleted." });
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
