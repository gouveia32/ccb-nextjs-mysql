import React from "react";
import Head from "next/head";
import { getSession, signIn } from "next-auth/client";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { PageLinks } from "../lib/Links";
import {
  LandingPageContentWrapper,
  LandingPageHeading,
  LandingPageSubHeading,
  LandingPageWrapper,
} from "../views/styles";
import {
  Button,
} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import useSwitchTimeout from "../hooks/useSwitchTimeout";


const transition = {
  type: "spring",
  stiffness: 80,
};

const bannerVariants = {
  exit: { height: "0px", y: "-100%", transition },
  enter: {
    height: "600px",
    y: "0%",
    transition,
  },
};

export default function LandingPage() {
  
  const renderHeader = (
    <>
      <LandingPageHeading>Prontuário</LandingPageHeading>
      <Button
        variant={"outlined"}
        size={"large"}
        startIcon={<ArrowForwardOutlinedIcon />}
        onClick={() => signIn()}
      >
        Entrar
      </Button>
      <LandingPageSubHeading>
        Registre toda as informações da consulta
      </LandingPageSubHeading>
    </>
  );

  const renderMainContent = (
    <LandingPageWrapper>
      {renderHeader}
      <LandingPageContentWrapper>
      </LandingPageContentWrapper>
    </LandingPageWrapper>
  );

  return (
    <>
      <Head>
        <title>Prontuário</title>
        <meta
          name="description"
          content="Aplicativo para genrencia Prontuários"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderMainContent}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: PageLinks.notesPage,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
