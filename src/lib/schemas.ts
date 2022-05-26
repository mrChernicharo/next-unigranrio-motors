import * as Yup from 'yup';

export const clientSchema = Yup.object({
	firstName: Yup.string().required('Nome é obrigatório'),
	lastName: Yup.string().required('Sobrenome é obrigatório'),
	email: Yup.string()
		.email('Insira um email válido')
		.required('Email é obrigatório'),
});

export const motorcycleSchema = Yup.object({
	name: Yup.string().required('Nome é obrigatório'),
	description: Yup.string(),
	year: Yup.number()
		.min(1920)
		.max(new Date().getFullYear())
		.required('Ano é obrigatório'),
	price: Yup.number().min(1000).required('Preço é obrigatório'),
	imgURL: Yup.string().matches(
		/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
		'insira uma url válida'
	),
});

export const transactionSchema = Yup.object({
	clientId: Yup.string().required('Selectione um cliente'),
	motorcycles: Yup.array().of(
		Yup.object().shape({
			id: Yup.string().required(),
			quantity: Yup.number().integer().min(1).required(),
		})
	),
});
