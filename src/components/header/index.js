import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Headers() {
  return (
    <header className={styles.header} >
      <div className={styles.headerName}>
        <Link href="/">
          <a className="text-xl font-bold text-white transition-colors duration-300 transform md:text-2xl hover:text-indigo-400">
            <Image src={"/assets/PF_Logo.png"} width={30} height={30} />
          </a>
        </Link>

        <a href="/clientes" className="bg-gray-200 hover:bg-gray-400 py-2 block whitespace-no-wrap">
          Clientes
        </a>

        <link rel="icon" href="/logo.jpg" />
        <link rel="image_src" href="assets/logo.jpg" />
      </div>
    </header>
  );
}
