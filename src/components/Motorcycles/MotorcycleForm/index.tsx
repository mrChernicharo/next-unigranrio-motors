import { Motorcycle } from '@prisma/client';
import { Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import { defaultMotoImgURL } from '../../../lib/constants';
import { motorcycleSchema } from '../../../lib/schemas';
import TextField from '../../shared/TextField';
import './motorcycle-form.module.css';

interface MotorcyclesFormProps {
	motorcycle?: Motorcycle;
}

export default function MotorcycleForm({ motorcycle }: MotorcyclesFormProps) {
	// const { createMotorcycle, updateMotorcycle } = Global;

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
				onSubmit={(values, actions) => {
					console.log({ values, actions });

					// if (motoId) updateMotorcycle({ ...values, id: motoId });
					// if (!motoId) createMotorcycle(values);
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
								{values.imgURL && <img src={values.imgURL} />}
							</div>

							<button type="submit">Salvar</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}
