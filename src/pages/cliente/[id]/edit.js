import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cliente } from '@prisma/client';

const prisma = new PrismaClient();

const Edit = ({ cliente }) => {
    const [formState, setformState] = useState({ nome: cliente.nome, telefone1: cliente.telefone1 })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote(); //post request
                // alert('Success');
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const updatedCliente = await prisma.updateCliente({
        data: {
          nome: nome,
          telefone1: telefone1,
        },
        where: {
          id: cliente.id,
        },
      })

    router.push('/');

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true)
    };
    const handleChange = (e) => {
        setformState({
            ...formState,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};

        if (!formState.nome) {
            err.nome = 'Title is Required'
        }

        if (!formState.telefone1) {
            err.telefone1 = 'Telefone is Required'
        }

        return err;
    };
    return (
        <div className={style.formcontainer}>
            <h1>Alteração de Cliente</h1>
            <div>
                {
                    isSubmitting ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                                value={formState.title}
                            />
                            <Form.TextArea
                                fluid
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                onChange={handleChange}
                                value={formState.description}
                            />

                            <Button type='submit'>Alterar</Button>
                        </Form>
                }
            </div>
        </div>

    );
}


Edit.getInitialProps = async ({ query: { id } }) => {
    const cliente = await prisma.cliente.findMany({ id: query });
    console.log("cliente:",cliente)
    return { ncliente: cliente }
}

export default Edit;