import Image from 'next/image';
import { Cliente } from '@prisma/client';

interface ClienteCardProps {
  cliente: Cliente;
}

export default function ClienteCard(props: ClienteCardProps) {
  //console.log("1Cliente:",props.cliente)
  return (
    <div className="border rounded-lg p-4 flex">
      <div className="my-auto">
      {props.cliente.nome}
      </div>
      <div className="ml-4">
        <p className="text-xl text-gray-700">
          {props.cliente.telefone1} {props.cliente.telefone2}
        </p>
        <p className="text-gray-500">{props.cliente.email}</p>
      </div>
    </div>
  );
}