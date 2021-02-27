import * as yup from 'yup';

const nameRegExp = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const max = new Date();
const emailRegExp= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const FormValidations = yup.object().shape({
    name: yup
    .string()
    .matches(nameRegExp, 'Campo nome não aceita numeros')
    .required("Nome é obrigatório"),
    endereco: yup
    .string()
    .required("Endereço é obrigatório"),
    telefone: yup
    .string()
    .matches(phoneRegExp, 'Campo telefone deve conter apenas numeros')
    .required("Telefone é obrigatório"),
    email: yup
    .string()
    .matches(emailRegExp, 'Formato de email não valido')
    .required("Email é obrigatório"),
    nascimento: yup
    .date()
    .typeError("Formato inválido")
    .max(new Date(max), `A data não pode ser maior que a data atual`)
    .required("Data de Nascimento é obrigatório"),
})