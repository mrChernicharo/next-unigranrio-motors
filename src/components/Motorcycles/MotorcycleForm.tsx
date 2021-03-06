/* eslint-disable @next/next/no-img-element */
import { Motorcycle } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { defaultMotoImgURL } from '../../lib/constants';
import { motorcycleSchema } from '../../lib/schemas';
import TextField from '../shared/TextField';

interface MotorcyclesFormProps {
	motorcycle?: Motorcycle;
	onSubmitted: (e: any) => void;
}

export default function MotorcycleForm({
	motorcycle,
	onSubmitted,
}: MotorcyclesFormProps) {
	const { createMotorcycle, updateMotorcycle } = useContext(DataContext);

	let motoId = 0;
	if (motorcycle) motoId = motorcycle.id;

	return (
		<div>
			<h5>Cadastrar Moto</h5>

			{/* prettier-ignore */}
			<Formik
				initialValues={{
					name: motorcycle?.name || '',
					description: motorcycle?.description || '',
					year: motorcycle?.year || 2022,
					price: motorcycle?.price || 0,
					imgURL: motorcycle?.imgURL || defaultMotoImgURL,
				}}
				validationSchema={motorcycleSchema}
				onSubmit={async (values, actions) => {
					// console.log({ values, actions });

					if (motoId) await updateMotorcycle({ ...values, id: motoId });
					if (!motoId) await createMotorcycle(values);

					const event = new Event('submit', { bubbles: true });
						onSubmitted(event);
					}}
			>
				{({ errors, touched, values }: FormikProps<Partial<Motorcycle>>) => { 
					return (
						<Form>
							<TextField
								id={nanoid()}
								name="name"
								label="Nome"
								placeholder="Nome"
								error={Boolean(errors.name && touched.name)}
								errorMessage={errors.name}
							/>
							<TextField
								id={nanoid()}
								name="description"
								placeholder="Descrição"
								label="Descrição"
								error={Boolean(
									errors.description && touched.description
								)}
								errorMessage={errors.description}
							/>
							<TextField
								id={nanoid()}
								name="year"
								label="Ano"
								placeholder="Ano"
								error={Boolean(errors.year && touched.year)}
								errorMessage={errors.year}
							/>
							<TextField
								id={nanoid()}
								name="price"
								label="Preço"
								placeholder="Preço"
								error={Boolean(errors.price && touched.price)}
								errorMessage={errors.price}
							/>
							<TextField
								id={nanoid()}
								name="imgURL"
								label="URL Imagem"
								placeholder="URL Imagem"
								error={Boolean(errors.imgURL && touched.imgURL)}
								errorMessage={errors.imgURL}
							/>

							<div className="preview-container">
								{values.imgURL && <img src={values.imgURL} alt="moto"/>}
							</div>

							<button type="submit">Salvar</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}
