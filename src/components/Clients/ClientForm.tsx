import { Client } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { clientSchema } from '../../lib/schemas';
import TextField from '../shared/TextField';

interface ClientFormProps {
	mode: 'create' | 'edit';
	onSubmitted: () => void;
	client?: Client;
}
export default function CreateClientForm({
	mode,
	onSubmitted,
	client,
}: ClientFormProps) {
	const { createClient, updateClient } = useContext(DataContext);

	let clientID = 0;
	if (mode === 'edit' && client) clientID = client.id;

	return (
		<div>
			<h5>Cadastrar Cliente</h5>

			<Formik
				initialValues={{
					firstName: client?.firstName || '',
					lastName: client?.lastName || '',
					email: client?.email || '',
				}}
				validationSchema={clientSchema}
				onSubmit={async (values, actions) => {
					console.log({ values, actions });

					if (mode === 'create') await createClient(values);
					if (mode === 'edit')
						await updateClient({ ...values, id: clientID });

					onSubmitted();
				}}
				enableReinitialize={true}
			>
				{({ errors, touched }: FormikProps<Partial<Client>>) => {
					return (
						<Form>
							<TextField
								id={nanoid()}
								name="firstName"
								label="Nome"
								placeholder="Nome"
								error={Boolean(
									errors.firstName && touched.firstName
								)}
								errorMessage={errors.firstName}
							/>
							<TextField
								id={nanoid()}
								name="lastName"
								placeholder="Sobrenome"
								label="Sobrenome"
								error={Boolean(
									errors.lastName && touched.lastName
								)}
								errorMessage={errors.lastName}
							/>
							<TextField
								id={nanoid()}
								name="email"
								label="Email"
								placeholder="email"
								error={Boolean(errors.email && touched.email)}
								errorMessage={errors.email}
							/>

							<button type="submit">Salvar</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

// initialValues={
// 	mode === 'create' && !client
// 		? { firstName: '', lastName: '', email: '' }
// 		: {
// 				firstName: client?.firstName,
// 				lastName: client?.lastName,
// 				email: client?.firstName,
// 		  }
// }
