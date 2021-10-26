import { Patient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getAllPatients } from "../../../repositories/PatientRepository";
import { cRestMethods } from "../../../lib/RestAPI";

import { useEffect } from "react";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Patient[]>
) {
  const session = await getSession({ req });
  
  //if (session) {
    const {
      query: { id, name },
      method,
      body,
    } = req;
      //console.log("query:",session)

    switch (method) {
      case cRestMethods.GET:
        const doctorPatients = await getAllPatients();
        //console.log("Pacientes:",doctorPatients)
        res.status(200).json(doctorPatients);
        break;
      case cRestMethods.POST:
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Método ${method} Não éPermitido`);
    }
  //} else {
    // Not Signed in
  //  res.status(401);
  //}
  res.end();
}
