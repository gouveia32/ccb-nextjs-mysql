import { useState } from 'react';
import { useForm } from 'react-hook-form';
//import { Input } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import Input from "../Input"
import Gap from '../Gap';
import Cliente from "./Cliente"

interface FormProps {
  cliente: Cliente;
  clienteChange?: (cliente: Cliente) => void;
  cancel?: () => void;
}

export default function ClienteForm(props: FormProps) {
  const { register, handleSubmit } = useForm();  

  const id = props.cliente?.id;
  const [nome, setNome] = useState(props.cliente?.nome ?? '');
  const [telefone1, setTelefone1] = useState(props.cliente?.telefone1 ?? '');
  return (
    <div>
      {id ? <Input text="Id" value={id} readOnly></Input> : false}
      <Input text="Nome" value={nome} handle={setNome}></Input>
      <Input text="Telefone1" value={telefone1} handle={setTelefone1}></Input>
      <div className="flex justify-end mt-5">
        <Button className="mr-2" color="blue" onClick={() => props.clienteChange?.(new Cliente(nome, telefone1, id))}>
          {id ? 'Update' : 'Save'}
        </Button>
        <Button color="gray" onClick={props.cancel}>
          Fechar
        </Button>
      </div>

    </div>

  )
}


