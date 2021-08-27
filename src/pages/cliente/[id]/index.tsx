import { GetServerSideProps } from 'next';
import Layout from "components/Layout";
import ClienteProps from "components/clientes/Cliente"
import Router from 'next/router';

import ClienteForm from 'components/clientes/ClienteForm';

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

async function saveCliente(Cliente) {
  const clienteId = Cliente.id;
  const cliente = await prisma.cliente.update({
    where: { id: Number(clienteId) },
    data: Cliente.nome,
  });

}


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
      <ClienteForm cliente={props} cancel={() => null} clienteChange={saveCliente} />
      <div>
        <h2>{nome}</h2>
        <button onClick={() => null}>Gravar</button>

      </div>
    </Layout>
  )
}


export default Cliente;