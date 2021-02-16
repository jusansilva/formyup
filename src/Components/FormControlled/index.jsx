import React, { useState, useEffect } from 'react';
import Input from "./Input";
import { FormValidations } from '../FormValidations';
import { ValidationError } from 'yup';

const initialFormState = {
    name: '',
    email: '',
    endereco: '',
    telefone: '',
    nascimento: ''
}

const UserForm = () => {

    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const validate = async () => {
        try {
            await FormValidations.validate(form, { abortEarly: false });
            setErrors({});
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = {}
                error.inner.forEach((key) => {
                    errors[key.path] = key.message;
                });
                setErrors(errors);
            }
        }
    };

    const setInput = (newValue) => {
        console.log(newValue)
        setForm(form => ({ ...form, ...newValue }));
    };

    useEffect(() => { validate() }, [form]);

    return (
        <>
            <h3>Formulário</h3>
            <form>
                <div className="form-group">
                    <Input
                        name="nome"
                        onChange={e => setInput({ name: e.target.value })}
                        label="Nome"
                        error={errors.name}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="email"
                        onChange={e => setInput({ email: e.target.value })}
                        label="E-mail"
                        error={errors.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="endereco"
                        onChange={e => setInput({ endereco: e.target.value })}
                        label="Endereço"
                        error={errors.endereco}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="telefone"
                        mask="(99) 99999-9999"
                        onChange={e => setInput({ telefone: e.target.value.replace(/[\[\].!'@,><|://\\;&*()_+=]/g, "") })}
                        label="Telefone"
                        error={errors.telefone}
                    />
                </div>
                <div className="form-group">
                    <Input
                        mask="99/99/9999"
                        name="nascimento"
                        onChange={e => setInput({ nascimento: e.target.value })}
                        label="Data Nascimento"
                        error={errors.nascimento} />
                </div>

                <div className="form-group">
                    <button
                        className="btn btn-primary"
                        type="button"
                    >Enviar</button>
                </div>
            </form>
        </>
    )
}

export default UserForm;