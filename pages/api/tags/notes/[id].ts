import { Note } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../../lib/RestAPI";
import { getTagNotes } from "../../../../repositories/TagRepository";

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
      query: { id },
      method,
      cookies,
    } = req;

    //console.log("query:",query)
    const patientId = cookies['pe-patient'];

    switch (method) {
      case cRestMethods.GET:
        const tagNotes: Note[] = await getTagNotes(id as string, patientId);
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