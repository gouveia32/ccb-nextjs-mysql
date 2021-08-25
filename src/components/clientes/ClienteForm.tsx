import { useForm } from 'react-hook-form';
import { Input } from "@chakra-ui/react"
import Gap from '../Gap';
import ErrorHelper from '../ErrorHelper';

interface ClienteFormProps {
  onSubmit: any;
}

export default function ClienteForm(props: ClienteFormProps) {
  const { register, handleSubmit, errors } = useForm();  

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <Gap>
        <Input
          placeholder="Nome"
          name="Nome"
        />
      </Gap>
      <Gap>
        <Input
          placeholder="Nome de Contato"
          name="ContatoNome"
        />
      </Gap>
      <Gap>
        <Input
          placeholder="Email"
          name="email"
        />
      </Gap>
      <Gap>
        <Input
          placeholder="Telefone"
          name="telefone1"
        />
      </Gap>

      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}