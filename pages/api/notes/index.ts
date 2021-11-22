import { Note } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  addNewNote,
  getAllDoctorNotes,
  updateNote,
} from "../../../repositories/NoteRepository";
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
      query: { id, name },
      method,
      body,
      cookies,
    } = req;

    const patientId = cookies['pe-patient'];

    switch (method) {
      case cRestMethods.GET:
        const doctorNotes = await getAllDoctorNotes(session, patientId);
        res.status(200).json(doctorNotes);
        //console.log("Notas:::",doctorNotes)
        break;
      case cRestMethods.POST:
        await addNewNote(body, session, patientId);
        res.status(201).json({ message: "Nota criada." });
        break;
      case cRestMethods.PUT:
        await updateNote(JSON.parse(body));
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let cookies = nookies.get(ctx)
  //console.log("cookies:",cookies)

  return {
    props: {
      server: true,
      cookies,
    },
  }
}