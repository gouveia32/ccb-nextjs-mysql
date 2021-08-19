import { PrismaClient, Cliente } from "@prisma/client";
import Layout from "components/Layout";
import ProductImage from "components/ProductImage";

const prisma = new PrismaClient();

export default function ID({ cliente }) {

  return (
    <Layout>
      <div className="container mx-auto px-6 py-6">
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {cliente.nome}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {cliente.name}
              </h1>
              <div className="flex">

                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  <a href="tel: +84918628660">Contact us</a>
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return {
    props: {
      cliente,
    },
  };
}

export async function getStaticPaths() {
  const clientes = await prisma.cliente.findMany();
  return {
    paths: clientes.map((cliente) => ({
      params: {
        id: cliente.id.toString(),
      },
    })),
    fallback: false,
  };
}
