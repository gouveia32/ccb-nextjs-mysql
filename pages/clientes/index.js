import { useRouter } from 'next/router'

import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from "../../components/table/TableContainer"
import { SelectColumnFilter } from "../../components/table/filters"
import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react"

import AddCliente from "../../components/Cliente/addcliente";

import ClienteCard from "../../components/Cliente/clientecard"

import { PrismaClient, Cliente } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticProps() {

  const clientes = await prisma.cliente.findMany({ take: 25 });
  //console.log("cli:",clientes);
  return {
    props: { clientes },
  };
};


function DeleteRec() {
  return null;
}

const Clientes = (props) => {
  const [showAddClienteModal, setShowAddClienteModal] = useState(false);
  //console.log("props:",props)  
  const router = useRouter()
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
      id,
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
      //<ClienteCard  cliente={row.original}/>      
      <Box bg="gray.200" borderRadius="md" isTruncated style={{ width: '32rem', margin: '0 auto' }}>
        <Text fontSize="2xl" align="center">
          {nome}
        </Text>
        <Text>
          <strong>Endereço</strong>: {endereco} {cidade}/{uf} <br />
          <strong>Email</strong>: {email} <br />
          <strong>Telefone</strong>: {`${telefone1}  ${telefone2}  ${telefone3}`} <br />
        </Text>
        <Box align="center">
          <Button colorScheme="teal" size="xs" onClick={() => {
            ClienteCard(row.original)
          }}>
            Editar
          </Button>
          <Button colorScheme="red" size="xs" onClick={DeleteRec}>
            Apagar
          </Button>
        </Box>
        {showAddClienteModal ? (
        <AddCliente closeModal={() => setShowAddClienteModal(false)} />
      ) : null}
      </Box>

    );
  };

  //console.log("clientes:",props.clientes)

  return (
    <>
        <TableContainer
          columns={columns}
          data={props.clientes}
          renderRowSubComponent={renderRowSubComponent}
        />
    </>
  )
}

export default Clientes