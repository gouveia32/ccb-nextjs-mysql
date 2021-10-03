import React, { useState, useCallback } from 'react';
import { PatientsContext } from './Context';
import { Note } from "@prisma/client";
import { getSession } from "next-auth/client";
import {
  getAllDoctorPatients,
} from "../../repositories/PatientRepository";

import { NextApiRequest, NextApiResponse } from "next";

const defaultPatient = {
  id: 'ckubmdq0w0085007tyojoqzn1',
  name: 'José'
};


async function selectFirstPatient (req,  res) {
  const session = await getSession({ req });
  if (session) {

    const patients = await getAllDoctorPatients(session);
    res.status(200).json(patients);
      
  }
  else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

const AppProvider = ({ children }) => {
  //const p = selectFirstPatient() || defaultPatient;
  const [patient, setPatient] = useState(defaultPatient);

  return (
    <PatientsContext.Provider value={{ patient }}>
      {children}
    </PatientsContext.Provider>
  );
};

export default AppProvider;