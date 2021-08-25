import Layout from "components/Layout";

import ClienteCard from 'components/clientes/ClienteCard';
import ClienteForm from 'components/clientes/ClienteForm';
import Head from 'next/head';

import { Cliente, PrismaClient, Prisma } from '@prisma/client';
import { useState } from 'react';

async function saveCliente(clente: Prisma.ClienteCreateInput) {
  const response = await fetch('api/clientes', {
    method: 'POST',
    body: JSON.stringify(clente),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}


const prisma = new PrismaClient();


export async function getServerSideProps() {
  const clientes = await prisma.cliente.findMany();

  return {
    props: {
      initialClientes: clientes,
    },
  };
}


export default function ID({ initialClientes }) {

  const [cliente, setCLiente] = useState<Cliente[]>(initialClientes);

  //console.log ("cliente:",cliente)


  return (
    <Layout>
      <div >
        <Head>
          <title>Clientes App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex w-full">
          <section className="w-1/3 bg-gray-800 h-screen p-8">
            <div className="mb-3">
              <h2 className="text-3xl text-white">Novo Cliente</h2>
            </div>
            <ClienteForm
              onSubmit={async (data, e) => {
                try {
                  await saveCliente(data);
                  setCLiente([...cliente, data]);
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </section>
          <section className="w-2/3 h-screen p-8">
            <div className="mb-3">
              <h2 className="text-3xl text-gray-700">Cliente</h2>
            </div>
            {cliente.map((c: Cliente, i: number) => (
              <div className="mb-3" key={i}>
                <ClienteCard cliente={c} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}

