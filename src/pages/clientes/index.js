import Layout from 'src/components/Layout';

import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from 'components/table/TableContainer'
import {SelectColumnFilter} from "components/table/filters"
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

import { PrismaClient, Cliente } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticProps() {

  const clientes = await prisma.cliente.findMany({take: 25});
  //console.log("cli:",clientes);
  return {
    props: { clientes },
  };
};

const Clientes = (props) => {
  //console.log("props:",props)  
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Nome',
        accessor: 'nome',
        filter: true,
      },
      {
        Header: 'Telefone',
        accessor: 'telefone1',
        disableSortBy: true,
      },
      {
        Header: 'Email',
        disableSortBy: true,
        accessor: 'email',
      },
      {
        Header: 'Cidade',
        accessor: 'cidade',
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
    ],
    []
  );

  const renderRowSubComponent = (row) => {
    const {
      nome,
      contato_nome,
      email,
      endereco,
      cidade,
      uf,
      cep,
      telefone1,
      telefone2,
      telefone3,
    } = row.original;
    return (
      <Card text="white" style={{ backgroundColor: '#081b1ba8', width: '32rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <strong>{nome}  </strong>
          </CardTitle>
          <CardText>
            <strong>Endereço</strong>: {endereco} {cidade}/{uf} <br />
            <strong>Email</strong>: {email} <br />
            <strong>Telefone</strong>: {`${telefone1}  ${telefone2}  ${telefone3}`} <br />
          </CardText>
        </CardBody>
      </Card>
    );
  };

  //console.log("clientes:",props.clientes)

  return (
    <>
      <Layout>
        <TableContainer
        columns={columns}
        data={props.clientes}
        renderRowSubComponent={renderRowSubComponent}
        />
      </Layout>
    </>
  )
}

export default Clientes