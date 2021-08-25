import { useForm } from 'react-hook-form';
import Input from '../Input';
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
          formRef={register({ required: true })}
        />
        {errors.Nome && (
          <ErrorHelper errorMessage="Nome é obrigatório" />
        )}
      </Gap>
      <Gap>
        <Input
          placeholder="Nome de Contato"
          name="ContatoNome"
          formRef={register({ required: true })}
        />
        {errors.contatoNome && (
          <ErrorHelper errorMessage="Name de contato é obrigatório" />
        )}
      </Gap>
      <Gap>
        <Input
          placeholder="Email"
          name="email"
          formRef={register({ required: true })}
        />
        {errors.email && <ErrorHelper errorMessage="Email é obrigatório" />}
      </Gap>
      <Gap>
        <Input
          placeholder="Telefone"
          name="telefone1"
          formRef={register({ required: false })}
        />
        {errors.telefone1 && <ErrorHelper errorMessage="Falha" />}
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