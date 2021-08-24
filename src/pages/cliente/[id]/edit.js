import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import style from '../../components/css/style.module.css';

const Edit = ({ note }) => {
    const [formState, setformState] = useState({ title: note.title, description: note.description })
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

    const updateNote = async () => {
        try {
            const res = await fetch(`/api/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }
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

        if (!formState.title) {
            err.title = 'Title is Required'
        }

        if (!formState.description) {
            err.description = 'Description is Required'
        }

        return err;
    };
    return (
        <div className={style.formcontainer}>
            <h1>Update Note</h1>
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

                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>

    );
}


Edit.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`/api/notes/${id}`);
    const { data } = await res.json();
    return { note: data }
}

export default Edit;