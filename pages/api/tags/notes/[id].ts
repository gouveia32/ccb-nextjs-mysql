import { Note } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../../lib/RestAPI";
import { getTagNotes } from "../../../../repositories/TagRepository";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Note[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { id },
      method,
    } = req;

    //console.log("query:",query)
    switch (method) {
      case cRestMethods.GET:
        const tagNotes: Note[] = await getTagNotes(id as string);
        //console.log("tagNotes:",tagNotes)
        res.status(200).json(tagNotes);
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
