import Link from "next/link";

export type ClienteProps = {
  id:             number
  nome:           string   
  contato_funcao: string  
  contato_nome:   string  
  cgc_cpf:        string  
  Razao_social:   string  
  inscr_estadual: string  
  endereco:       string  
  cidade:         string   
  uf:             string  
  cep:            string  
  telefone1:      string  
  telefone2:      string  
  telefone3:      string  
  email:          string  
  obs:            string  
  estado:         number     
  preco_base:     number
};

export default function Cliente({ cliente }) {
  return (
    <>
      <Link href="/cliente/[id]" as={`/cliente/${cliente.id}`}>
        <a>
          <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden border-2 hover:border-gray-500">
            <div className="h-28 px-5 py-3">
              <h3 className="text-gray-700 uppercase font-semibold">
                {cliente.nome}
              </h3>
              <div className="grid grid-cols-2 grid-rows-1">
                <span className="text-indigo-500 uppercase mt-2">
                  Telefone: {cliente.telefone1 === "" ? "Contact" : cliente.telefone1}
                </span>
                <span className="text-indigo-500 mt-2 text-right uppercase">
                  {cliente.email}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
