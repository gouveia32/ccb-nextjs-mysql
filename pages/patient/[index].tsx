import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewPatient,
  PatientsAPI,
  selectPatients,
  selectPatientsLoading,
  selectPatient,
} from "../../API/PatientsAPI/PatientsAPI";
import { get } from "../../lib/RestAPI";
import { PatientType } from "../../models/Patient";
import React, { useEffect, useState } from "react";
import { TagType } from "../../models/Tag";
import { selectTags } from "../../API/TagsAPI/TagsAPI";
import { ChangeActionType } from "../../lib/helpers";
import { useRouter } from "next/router";
import { ApiLinks, PageLinks } from "../../lib/Links";
import { CheckPointType } from "../../models/CheckPointObject";
import { Loading } from "../../components/Loading/loading.component";
import Head from "next/head";
import nookies from 'nookies'

export interface PatientsPageProps {
  session: Session | null;
  doctorPatients: PatientType[];
  patientId: any;
}

export default function PatientsPage({ session, doctorPatients, patientId }: PatientsPageProps) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [patientsToRender, setPatientsToRender] = useState(doctorPatients);

  const newPatient = useSelector(selectPatient);
  
  const handleChangePatient = (action: ChangeActionType) => {
    dispatch(PatientsAPI.handleChange(action));
  };

  const handleOnDeletePatient = (patient: PatientType) => {
    dispatch(PatientsAPI.deletePatient(patient));
  };

  const renderAddPatientInput = (
    <div>
      TESTE
    </div>    
  );


  //console.log("patient:",patientsToRender)
  return (
    <>
      <Head>
        <title>Prontuário</title>
      </Head>
      {renderAddPatientInput}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PatientsPageProps> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: PageLinks.landingPage,
      },
    };
  }

  const doctorPatients: PatientType[] = await get(
    `${process.env.HOST}${ApiLinks.patients}`,
    context.req.headers.cookie!
  );

  //console.log("cookie:",context.req.headers.cookie!)

  const patientId = nookies.get(context)['pe-patient'];

  return {
    props: {
      session: session,
      doctorPatients: doctorPatients,
      patientId,
    },
  };
};
