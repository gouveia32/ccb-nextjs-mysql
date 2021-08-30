import { PrismaClient, Cliente } from "@prisma/client";
import { useState } from "react";
import Layout from "components/Layout";

const prisma = new PrismaClient()

export default function Home({ clientedata }) {
  const [clientes, setClientes] = useState<Cliente[]>(clientedata);
  //console.log("Clientes0:",clientes)
  return (
      <div>Bemvindo a Ponto Fino Bordados</div>
  );
}

export async function getStaticProps() {
  const clientes: Cliente[] = await prisma.cliente.findMany();

  //console.log("cli:",clientes)
  return {
    props: {
      clientedata: clientes,
    },
  };
}
