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
          placeholder="First Name"
          name="firstName"
          formRef={register({ required: true })}
        />
        {errors.firstName && (
          <ErrorHelper errorMessage="First Name is required" />
        )}
      </Gap>
      <Gap>
        <Input
          placeholder="Last Name"
          name="lastName"
          formRef={register({ required: true })}
        />
        {errors.lastName && (
          <ErrorHelper errorMessage="Last Name is required" />
        )}
      </Gap>
      <Gap>
        <Input
          placeholder="Email"
          name="email"
          formRef={register({ required: true })}
        />
        {errors.email && <ErrorHelper errorMessage="Email is required" />}
      </Gap>
      <Gap>
        <Input
          placeholder="Avatar"
          name="avatar"
          formRef={register({ required: true })}
        />
        {errors.avatar && <ErrorHelper errorMessage="Avatar is required" />}
      </Gap>

      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}