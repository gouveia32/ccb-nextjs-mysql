import { GetServerSideProps } from 'next';
import Layout from "components/Layout";
import { ClienteProps } from "components/clientes/Cliente"
import Router from 'next/router';

import ClienteCard from 'components/clientes/ClienteCard';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
  });
  return {
    props: cliente,
  };
};

async function publishCliente(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/cliente/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

const Cliente: React.FC<ClienteProps> = (props) => {
  let nome = props.nome;

  return (
    <Layout>
      <div>
        <h2>{nome}</h2>
        <button onClick={() => null}>Gravar</button>

      </div>
    </Layout>
  )
}


export default Cliente;