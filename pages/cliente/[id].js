import styles from "./Cliente.module.css";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import EditCliente from "../../components/Cliente/editcliente"
import axios from "axios";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export default function Cliente(props) {
  const [showEditClienteModal, setShowEditClienteModal] = useState(false);
  const router = useRouter();
  const { cliente } = props;

  async function deleteCliente() {
    if (window.confirm("Do you want to delete this cliente?")) {
      // ...
      await axios.post("/api/cliente/deleteCliente", { id: parseInt(cliente?.id) });
      router.push("/clientes");
    }
  }
  return (
    <div className={styles.clienteContainer}>
      <div className={styles.cliente}>
        <div
          alt={`Cliente Image of: ${cliente?.nome}`}
          aria-label={`Cliente Image of: ${cliente?.nome}`}
          className={styles.clienteImage}
          style={{ backgroundImage: `url(${cliente?.imageUrl})` }}
        ></div>

        <div className={styles.clienteDetails}>
          <div className={styles.clienteName}>
            <h1>{cliente?.nome}</h1>
          </div>
          <div className={styles.clienteTelefone1}>
            <h1>{cliente?.telefone1}</h1>
          </div>
          <div style={{ padding: "5px 0" }}>
            <span>
              <button
                onClick={() => setShowEditClienteModal((pV) => !pV)}
                style={{ marginLeft: "0" }}
                className="btn"
              >
                Alterar
              </button>
              <button onClick={deleteCliente} className="btn btn-danger">
                Apagar
              </button>
              <a href="/clientes" className="bg-gray-200 hover:bg-gray-400 py-2 block whitespace-no-wrap">
                Retornar
              </a>
            </span>
          </div>
          <div style={{ padding: "5px 0" }}>
            <span> Email: {cliente?.email}</span>
          </div>
          <div className={styles.clienteDescIngreCnt}>
            <h2>Ingredients</h2>
            <div className={styles.clienteSynopsis}>{cliente?.ingredients}</div>
          </div>
          <div className={styles.clienteDescIngreCnt}>
            <h2>Description</h2>
            <div className={styles.clienteSynopsis}>{cliente?.description}</div>
          </div>
        </div>
      </div>
      {showEditClienteModal ? (
        <EditCliente cliente={cliente} closeModal={() => setShowEditClienteModal(false)} />
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cliente = await prisma.cliente.findUnique({ where: { id: parseInt(id) } });
  return {
    props: {
      cliente,
    },
  };
}
