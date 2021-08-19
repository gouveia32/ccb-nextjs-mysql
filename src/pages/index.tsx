import { PrismaClient, Category, Product, Post, Cliente } from "@prisma/client";
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
  const [categories, setCategories] = useState<Category[]>(categorydata);
  const [products, setProducts] = useState<Product[]>(productdata);
  const [posts, setPosts] = useState<Post[]>(postdata);
  const [clientes, setClientes] = useState<Cliente[]>(clientedata);
  //console.log("Clientes0:",clientes)
  return (
    <Layout>
      <CategoryList categories={categories} />
      <HeroSection2 />
      <ProductList products={products} />
      <HeroSection />
    </Layout>
  );
}

export async function getStaticProps() {
  const categories: Category[] = await prisma.category.findMany();
  const posts: Post[] = await prisma.post.findMany({
    include: {
      post_category: true,
    },
  });
  const products: Product[] = await prisma.product.findMany({
    where: {
      published: true,
    },
    include: {
      images: true,
      category: true,
    },
  });
  const clientes: Cliente[] = await prisma.cliente.findMany();

  //console.log("cli:",clientes)
  return {
    props: {
      categorydata: categories,
      productdata: products,
      postdata: posts,
      clientedata: clientes,
    },
  };
}
