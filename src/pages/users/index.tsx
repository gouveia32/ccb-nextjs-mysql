import React from "react";
import { useRef } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Slider from "react-slick";
import { ClienteProps } from "components/clientes/Cliente"
import { PrismaClient, Cliente } from "@prisma/client";
import {
  Flex,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react"
import Layout from 'src/components/Layout';

import TablePerso from "components/table";


const prisma = new PrismaClient();

const ClienteCard = dynamic(
  () => import('components/clientes/ClienteCard'),
  { loading: () => <p>carregando</p> }
)

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 4,
  variableWidth: true,
  initialSlide: 0,
  infinite: false,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 375,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    }
  ]
};

export async function getStaticProps() {

  const clientes = await prisma.cliente.findMany();
  //console.log("cli:",clientes);
  return {
    props: { clientes },
  };
};

type Props = {
  clientes: ClienteProps[];
};

const Users: React.FC<Props> = (props) => {
  const ref = useRef(null)

  const handlePrev = () => {
    ref.current.slickPrev()
  }

  const handleNext = () => {
    ref.current.slickNext()
  }
  //console.log("props:",props);

  
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Telefone",
        accessor: "telefone1",
        isNumeric: false,
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  //console.log("clientes:",props.clientes)

  return (
    <>
      <Layout>
        <TablePerso
          data={props.clientes}
          columns={columns}
          isResponsive={true}
          onRowClick={(row: any) => console.log(row)}
          responsiveView={<Flex>responsive here....</Flex>}
          isPaginate
          onPageChanged={(f: any) => alert(JSON.stringify(f))}
          currentPage={1}
          totalRecords={300}
          pageLimit={2}
        />
      </Layout>
    </>
  )
}

export default Users;