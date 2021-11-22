import { Doctor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteDoctor, searchDoctors, getDoctorByName } from "../../../repositories/DoctorRepository";
import { getSession } from "next-auth/client";
import { cRestMethods } from "../../../lib/RestAPI";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Doctor[]>
) {
  const session = await getSession({ req });

  if (session) {
    const {
      query: { name },
      method,
    } = req;

    switch (method) {
      case cRestMethods.GET:
        const doctor: Doctor[] = await getDoctorByName(
          name ? (name as string) : '',
        );
        //console.log("Aqui",id)
        res.status(200).json(doctor);
        break;
      case cRestMethods.DELETE:
        await deleteDoctor(name as string);
        res.status(200).json({ message: "Médico apagado." });
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
