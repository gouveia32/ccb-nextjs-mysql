import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn,
} from "next-auth/client";
import KeepLogo from "../../../resources/assets/keep.svg";
import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import Head from "next/head";
import React, { useState } from "react";
import {
  SignInPageContainer,
  SignInPageForm,
  SignInPageHeadline,
  SignInPageLogo,
} from "../../../views/auth/signin/sigin.styles";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

export interface SignInProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export default function SignInPage({ providers }: SignInProps) {
  const [doctorName, setDoctorName] = useState("");

  const renderHeader = (
    <>
      <SignInPageLogo>
        <KeepLogo />
      </SignInPageLogo>
      <SignInPageHeadline>Prontuário</SignInPageHeadline>
    </>
  );


  const renderCredentialsInput = (
    <>
      <TextField
        margin={"normal"}
        label={"Nome do Médico"}
        placeholder={"Digite o nome do médico"}
        variant={"standard"}
        fullWidth={true}
        size={"small"}
        InputProps={{
          startAdornment: (
            <InputAdornment position={"start"}>
              <PersonOutlineOutlinedIcon fontSize={"small"} />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setDoctorName(event.target.value)}
        onKeyDown={(event) =>
          event.keyCode === 13 && signIn("credentials", { doctorName: doctorName })
        }
        value={doctorName.toUpperCase()}
      />
      <Button
        size={"small"}
        className="mt-2"
        variant={"outlined"}
        fullWidth={true}
        onClick={() => {
          signIn("credentials", { doctorName: doctorName })
        }}
      >
        Entrar
      </Button>
    </>
  );

  const renderForm = () => {
    return (
      <SignInPageForm>
        {renderHeader}
        {renderCredentialsInput}
        <Divider className="w-100 mt-3 bg-dark" variant={"fullWidth"} />
{/*         {renderOtherProvidersInputs} */}
      </SignInPageForm>
    );
  };

  return (
    <>
      <Head>
        <title>Página de Login</title>
        <meta name="description" content="SignIn page" />
      </Head>
      <SignInPageContainer>{renderForm()}</SignInPageContainer>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SignInProps>> {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return {
      props: { providers: null },
    };
  }

  const providers: Record<
    string,
    ClientSafeProvider
  > | null = await getProviders();

  return {
    props: {
      providers: providers,
    },
  };
}
