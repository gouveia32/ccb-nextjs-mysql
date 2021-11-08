import useForm from './useForm'

interface IExampleFormProps {
  submitForm: (inputs: { [key: string]: any }) => void
}


export default function PatientModal(props: IExampleFormProps) {
  const {
    errors,
    inputs,
    submitted,
    onSubmit,
    onChange,
  } = useForm({
    initialState: {
      name: '',
      email: '',
      telephone: '',
    },
    onSuccessSubmit: props.submitForm,
    validate: (newInputs: { [key: string]: any }) => {
      const { name, email, telephone } = newInputs
      const newErrors: { [key: string]: any } = {}
      if (!name) {
        newErrors.name = 'Email is required'
      } else if (true) {  // isEmail
        newErrors.email = 'Email format is invalid'
      }
      if (!email) {
        newErrors.phone = 'Phone is required'
      } else if (email.length < 10) {
        newErrors.phone = 'Phone should be at least 10 digits'
      }
      return newErrors
    },
  })
  
  return (<form onSubmit={onSubmit}>
    <fieldset>
      <label>Email</label>
      <input name="name" value={inputs.name} onChange={onChange} />
      { (submitted && errors.name) ? (
        <p>{ errors.name }</p>
      ) : null }
    </fieldset>
    <fieldset>
      <label>Telefone</label>
      <input name="telephone" value={inputs.telephone} onChange={onChange} />
      { (submitted && errors.telephone) ? (
        <p>{ errors.telephone }</p>
      ) : null }
    </fieldset>
    <fieldset>
      <button type="submit">Submit</button>
    </fieldset>
  </form>)
}