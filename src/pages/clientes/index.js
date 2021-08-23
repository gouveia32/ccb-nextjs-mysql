import Layout from 'src/components/Layout';

import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from 'components/table';
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
          <span {...row.getToggleRowExpandedProps}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: 'Nome',
        accessor: 'nome',
        //Filter: SelectColumnFilter,
        filter: 'equals',
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
      },
    ],
    []
  );

  const renderRowSubComponent = (row) => {
    console.log("row:",row)
    const {
      name: { nome, email, telefone1 },
      cell,
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <strong>{`${nome} ${email}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Telefone</strong>: {telefone1} <br />
          </CardText>
        </CardBody>
      </Card>
    );
  };

  //console.log("clientes:",props.clientes)

  return (
    <>
      <Layout>
        {/*<TablePerso
          columns={columns}
          data={props.clientes}
          onRowClick={(row: any) => console.log(row)}
          isPaginate
          onPageChanged={(f: any) => alert(JSON.stringify(f))}
          currentPage={1}
          totalRecords={12}
          pageLimit={2}
        />*/}

        {/*<Table2
          data={props.clientes}
          columns={columns}
        />*/}
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