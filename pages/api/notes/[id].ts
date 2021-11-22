import { Note } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { deleteNote, searchNotes } from "../../../repositories/NoteRepository";
import { cRestMethods } from "../../../lib/RestAPI";

import { GetServerSideProps } from 'next'
import nookies from 'nookies'

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
      query: { id, query, tagId },
      method,
      cookies,
    } = req;

    const patientId = cookies['pe-patient'];

    switch (method) {
      case cRestMethods.GET:
        const notes: Note[] = await searchNotes(
          query as string,
          session,
          tagId ? (tagId as string) : undefined,
          patientId ? (patientId as string) : undefined,
        );
        //console.log("Aqui query:",query)
        res.status(200).json(notes);
        break;
      case cRestMethods.DELETE:
        await deleteNote(id as string);
        res.status(200).json({ message: "Nota apagada." });
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let cookies = nookies.get(ctx)
  console.log("cookies:",cookies)

  return {
    props: {
      server: true,
      cookies,
    },
  }
}