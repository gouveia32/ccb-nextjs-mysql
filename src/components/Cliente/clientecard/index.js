import styles from "./ClienteCard.module.css";
import Link from "next/link";

export default function ClienteCard({ cliente }) {
  //console.log("cliente:",cliente)
  return (
    <Link href={`/cliente/${cliente.id}`}>
      <div className={styles.clienteCard}>
        <div
          alt={`Cliente Image of: ${cliente?.nome}`}
          aria-label={`Cliente Image of: ${cliente?.nome}`}
          className={styles.clienteCardImg}
          style={{ backgroundImage: `url(${cliente.imageUrl})` }}
        ></div>
        <div className={styles.clienteCardFooter}>
          <div className={styles.clienteCardNome}>
            <h3>{cliente.nome}</h3>
          </div>
          <div className={styles.clienteCardPrice}>
            <span>Price(💵)</span>
            <span>{cliente.preco_base}</span>
          </div>
          <div className={styles.clienteCardActive}>
            <span>Active:</span>
            <span>{cliente.active}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
