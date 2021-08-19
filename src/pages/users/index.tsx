import { PrismaClient, Cliente } from "@prisma/client";
import Router from "next/router";
import { GetServerSideProps } from "next";
import Layout from "components/Layout";
import { ClienteProps } from "components/clientes/Cliente"
import { useRouter } from 'next/router'
import React, { useState } from "react";

import {
  Button,
  useDisclosure,
} from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"


import { Box, Flex, Link } from "@chakra-ui/layout";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const clientes = await prisma.cliente.findMany();
  return {
    props: { clientes },
  };
};

type Props = {
  clientes: ClienteProps[];
};

const Clientes: React.FC<Props> = (props) => {
  const { isOpen: isDeleteUmOpen, onOpen: onDeleteUmOpen, onClose: onDeleteUmClose } = useDisclosure()
  const { isOpen: isDeleteTodosOpen, onOpen: onDeleteTodosOpen, onClose: onDeleteTodosClose } = useDisclosure()
  const router = useRouter()
  const [selectedClientes, setSelectedClientes] = useState([]);

  const handleSelectCliente = (event) => {
    const id = event.target.value;

    if (!selectedClientes.includes(id)) {
      setSelectedClientes([...selectedClientes, id]);
    } else {
      setSelectedClientes(
        selectedClientes.filter((selectedClienteId) => {
          return selectedClienteId !== id;
        })
      );
    }
  };

  return (
    <>
      <Layout>
        <div style={{ textAlign: 'end', marginBottom: '.5rem' }}>

          <Button colorScheme="teal" size="xs" mr='2' onClick={() => { }}>Novo</Button>
          {/* Delete Todos */}
          <Button colorScheme="red" size="xs" onClick={onDeleteTodosOpen}>
            Apagar todos
          </Button>
          <Modal isOpen={isDeleteTodosOpen} onClose={onDeleteTodosClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Apagar todos os clientes</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Tem certeza ?
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onDeleteTodosClose}>Não</Button>
                <Button colorScheme="red" onClick={() => { }}>
                  Apagar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid grey' }}>
          <Table width="100%" variant="striped" colorScheme="teal">
            <TableCaption>Clientes</TableCaption>
            <Thead>
              <Tr style={{ alignContent: 'center' }}>
                <Th>
                  <h3>id</h3>
                </Th>
                <Th align="left">
                  <h3>Nome</h3>
                </Th>
                <Th align="left">
                  <h3>Telefone</h3>
                </Th>
                <Th>
                  <h3>Email</h3>
                </Th>
                <Th>
                  <h3>Ação</h3>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.clientes?.map((value, index) => {
                return (
                  <Tr key={`${value.nome}${index}`} style={{ alignContent: 'center' }}>
                    <Td>
                      <p>{value.id}</p>
                    </Td>
                    <Td align="left">
                      <p>{value.nome}</p>
                    </Td>
                    <Td align="left">
                      <p>{value.telefone1}</p>
                    </Td>
                    <Td>
                      <p>{value.email}</p>
                    </Td>
                    <Td>
                      <Button colorScheme="teal" size="xs" mr='2' onClick={() => router.push(`/cliente/edit/${value.id}`)}>Alterar</Button>
                      {/* Delete Um */}
                      <Button colorScheme="red" size="xs" onClick={onDeleteUmOpen}>
                        Apagar
                      </Button>
                      <Modal isOpen={isDeleteUmOpen} onClose={onDeleteUmClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Apagar: {selectedClientes}</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            Tem certeza ?
                          </ModalBody>

                          <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onDeleteUmClose}>Não</Button>
                            <Button colorScheme="red" onClick={() => { }}>
                              Apagar
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </div>

        {/*<Box>
            Clientes
            <p>{JSON.stringify(clientes)}</p>
        </Box>*/}
      </Layout>
    </>
  );
};

export default Clientes;
