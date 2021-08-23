import { PrismaClient, Cliente } from "@prisma/client";
import { useState } from "react";
import CategoryList from "components/CategoryList";
import ProductList from "components/ProductList";
import ClienteList from "components/ClienteList";
import Layout from "components/Layout";
import HeroSection from "components/HeroSection";
import PostList from "components/PostList";
import HeroSection2 from "../components/HeroSection2";

const prisma = new PrismaClient();

export default function Home({ categorydata, productdata, postdata, clientedata }) {
  const [clientes, setClientes] = useState<Cliente[]>(clientedata);
  //console.log("Clientes0:",clientes)
  return (
    <Layout>
      <HeroSection2 />
      <HeroSection />
    </Layout>
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
