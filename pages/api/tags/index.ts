import { Tag } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../lib/RestAPI";
import {
  addNewTag,
  getAllDoctorTags,
  updateTag,
} from "../../../repositories/TagRepository";


type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Tag[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { id, name },
      method,
      body,
    } = req;

    //const patientId = cookies['pe-patient'];

    switch (method) {
      case cRestMethods.GET:
        const doctorTags = await getAllDoctorTags(session);
        //console.log("Aqui:::",patientId)
        res.status(200).json(doctorTags);
        break;
      case cRestMethods.POST:
        await addNewTag(body, session);
        res.status(201).json({ message: "Etiqueta Criada." });
        break;
      case cRestMethods.PUT:
        await updateTag(JSON.parse(body));
        res.status(200).json({ message: "Etiqueta alterada." });
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
