import Image from 'next/image';
import { Cliente } from '@prisma/client';

interface ClienteCardProps {
  cliente: Cliente;
}

export default function ClienteCard(props: ClienteCardProps) {
  return (
    <div className="border rounded-lg p-4 flex">
      <div className="my-auto">
      <div className="ml-4">
      </div>
        <p className="text-xl text-gray-700">
          {props.cliente.nome} {props.cliente.contato_nome}
        </p>
        <p className="text-gray-500">{props.cliente.email}</p>
      </div>
    </div>
  );
}