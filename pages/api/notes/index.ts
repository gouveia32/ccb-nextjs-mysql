import { Note } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  addNewNote,
  getAllDoctorNotes,
  updateNote,
} from "../../../repositories/NoteRepository";
import { cRestMethods } from "../../../lib/RestAPI";
import React, { useContext } from 'react';
import { getPatientById, getAllDoctorPatients } from "../../../repositories/PatientRepository";
import { Session } from "next-auth";

import CtxProvider from '../../../components/AppContext/Context';


async function selectedPatient () {
  //const { patient } = useContext(PatientContext);
  //const patient = usePatientContext();

  const patientId = "ckubmdq0w0085007tyojoqzn1";
  
  const p = await getPatientById(patientId);


  return p.id
}

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
    } = req;
      //console.log("query:",session)
    const patientId = await selectedPatient();

    switch (method) {
      case cRestMethods.GET:
        const doctorNotes = await getAllDoctorNotes(session,patientId);
        //console.log("Notas:",doctorNotes)
        res.status(200).json(doctorNotes);
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
