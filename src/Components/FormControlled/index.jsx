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


    const inputChange = (event) => {

        return setInput(event.target)
    }

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
        let data = "";
        switch (newValue.name) {
            case "nome":
                data = { "name": newValue.value }
                break;
            case "endereco":
                data = { "endereco": newValue.value }
                break;
            case "email":
                data = { "email": newValue.value }
                break;
            case 'telefone':
                data = { "telefone": newValue.value }
                break;
            case 'nascimento':
                data = { "nascimento": newValue.value }
                break;
        }
        setForm(form => ({ ...form, ...data }));
    };

    useEffect(() => { validate() }, [form]);

    return (
        <>
            <h3>Formulário</h3>
            <form>
                <div className="form-group">
                    <Input
                        name="nome"
                        onChange={inputChange}
                        label="Nome"
                        error={errors.name}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="email"
                        onChange={inputChange}
                        label="E-mail"
                        error={errors.email}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="endereco"
                        onChange={inputChange}
                        label="Endereço"
                        error={errors.endereco}
                    />
                </div>
                <div className="form-group">
                    <Input
                        name="telefone"
                        mask="(99) 99999-9999"
                        onChange={inputChange}
                        label="Telefone"
                        error={errors.telefone}
                    />
                </div>
                <div className="form-group">
                    <Input
                        mask="99/99/9999"
                        name="nascimento"
                        onChange={inputChange}
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