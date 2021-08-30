import styles from "./Clientes.module.css";
import ClienteCard from "./../../components/Cliente/clientecard";
import { PrismaClient } from "@prisma/client";
import AddCliente from "../../components/Cliente/addcliente";
import { useState } from "react";

const prisma = new PrismaClient();

function Clientes(props) {
  const [showAddClienteModal, setShowAddClienteModal] = useState(false);
  const clientes = props.clientes;

  return (
    <div className={styles.clientesCnt}>
      <div className={styles.clientesBreadcrumb}>
        <div>
          <h2>CLIENTES</h2>
        </div>
        <div>
          <button
            className="btn"
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              fontWeight: "500",
            }}
            onClick={() => setShowAddClienteModal((pV) => !pV)}
          >
            Novo Cliente
          </button>
        </div>
      </div>
      <div className={styles.clientes}>
        {clientes?.map((cliente, i) => (
          <ClienteCard cliente={cliente} key={i} />
        ))}
      </div>
      {showAddClienteModal ? (
        <AddCliente closeModal={() => setShowAddClienteModal(false)} />
      ) : null}
    </div>
  );
}

export async function getServerSideProps() {
  const allClientes = await prisma.cliente.findMany();
  //console.log("Clientes:",allClientes)
  return {
    props: {
      clientes: allClientes,
    },
  };
}
export default Clientes;
