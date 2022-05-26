import { Field, Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import Global from '../../../../hooks/Global';
import { IClient, IPartialClient } from '../../../../utils/interfaces';
import { clientSchema } from '../../../../utils/schemas';
import TextField from '../../../shared/TextField';

interface IClientFormProps {
	mode: 'create' | 'edit';
	onSubmitted: () => void;
	client?: IClient;
}
export default function CreateClientForm({
	mode,
	onSubmitted,
	client,
}: IClientFormProps) {
	const { createClient, updateClient } = Global;

	let clientID = '';
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
				onSubmit={(values, actions) => {
					console.log({ values, actions });

					if (mode === 'create') createClient(values);
					if (mode === 'edit')
						updateClient({ ...values, id: clientID });

					onSubmitted();
				}}
				enableReinitialize={true}
			>
				{({ errors, touched }: FormikProps<IPartialClient>) => {
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
