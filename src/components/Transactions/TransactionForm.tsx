import { ErrorMessage, FieldArray, Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { DataContext } from '../../contexts/DataContext';
import {
	CompleteTransaction,
	FormTransaction,
	toCurrency,
} from '../../lib/helpers';
import { transactionSchema } from '../../lib/schemas';
import DropdownField, { IDropdownOption } from '../shared/DropdownField';
import NumberField from '../shared/NumberField';

interface IProps {
	transaction?: CompleteTransaction;
	onSubmitted: (e: any) => void;
}

export default function TransactionForm({ transaction, onSubmitted }: IProps) {
	const { clients, motorcycles, createTransaction, updateTransaction } =
		useContext(DataContext);

	let transactionID = 0;
	if (transaction) transactionID = transaction.id;

	const clientOpts: IDropdownOption[] = [
		{ id: 0, name: '', value: '' },
		...clients.map(client => ({
			id: client.id,
			name: `${client.firstName} ${client.lastName}`,
			value: client.id,
		})),
	];

	const motorcycleOpts: IDropdownOption[] = [
		{ id: 0, name: '', value: '' },
		...motorcycles.map(motorcycle => ({
			id: motorcycle.id,
			name: motorcycle.name,
			value: motorcycle.id,
		})),
	];

	const getMoto = (id: number) => motorcycles.find(moto => moto.id === id);

	const getTotal = (motos: { id: number; quantity: number }[]) => {
		return motos.reduce(
			(acc, moto) =>
				(acc += (getMoto(Number(moto.id))?.price || 0) * moto.quantity),
			0
		);
	};

	return (
		<Formik
			initialValues={{
				clientId: transaction?.client?.id || 0,
				motorcycles: transaction?.motorcycles
					? transaction?.motorcycles.map(item => ({
							id: item.id,
							quantity: item.quantity,
					  }))
					: [{ id: 0, quantity: 1 }],
				total: transaction?.total || 0,
			}}
			validationSchema={transactionSchema}
			onSubmit={async (values, actions) => {
				const { resetForm } = actions;

				transactionID
					? await updateTransaction({
							id: transactionID,
							clientId: values.clientId,
							motorcycles: values.motorcycles,
							total: getTotal(values.motorcycles),
					  })
					: await createTransaction({
							clientId: values.clientId,
							motorcycles: values.motorcycles,
							total: getTotal(values.motorcycles),
					  });

				// resetForm();

				const event = new Event('submit', { bubbles: true });
				onSubmitted(event);
			}}
		>
			{({
				errors,
				values,
				handleBlur,
				handleChange,
			}: FormikProps<FormTransaction>) => {
				return (
					<Form>
						<h5>Cadastrar Venda</h5>

						<DropdownField
							id={nanoid()}
							name="clientId"
							label="Cliente"
							placeholder="Selecione o cliente"
							options={clientOpts}
							onChange={handleChange}
						/>
						<div className="error-message">{errors.clientId}</div>
						{values.clientId ? (
							<FieldArray name="motorcycles">
								{arrayHelpers => {
									return (
										<div className="motorcycles-list">
											{values?.motorcycles &&
											values.motorcycles.length > 0 ? (
												<>
													{/* prettier-ignore */}
													{values.motorcycles.map(
														(moto, i) => (
															<div
																key={nanoid()}
																className="transaction-item"
															>
																{/* prettier-ignore */}
																<div className="form-row">
																<DropdownField
																	id={nanoid()}
																	name={`motorcycles[${i}].id`}
																	placeholder="selecione motocicleta"
																	label={`Moto ${
																		i < 9
																		? '0' + (i + 1)
																		: i + 1
																	}`}
																	options={motorcycleOpts}
																	onChange={handleChange}
																>
																	<ErrorMessage
																		name={`motorcycles[${i}].id`}
																		render={() => (
																			<div className="error-message">
																				selecione uma moto
																			</div>
																		)}
																	/>
																</DropdownField>
																<NumberField
																	id={nanoid()}
																	name={`motorcycles[${i}].quantity`}
																	label="Quantidade"
																	min={1}
																	handleBlur={handleBlur}
																	handleChange={handleChange}
																	value={values.motorcycles[i].quantity}
																/>
																<div
																	style={{
																		paddingTop: `1rem`,
																	}}
																>
																	<button
																		type="button"
																		title="deletar item"
																		onClick={() => arrayHelpers.remove(i)}
																	>
																		<FiTrash />
																	</button>
																</div>
															</div>
															</div>
														)
													)}
												</>
											) : null}
											<button
												style={{
													marginBlock: 10,
												}}
												type="button"
												id="add-moto-btn"
												onClick={() =>
													arrayHelpers.push({
														id: '',
														quantity: 1,
													})
												}
											>
												<FiPlus />
											</button>
											<label
												htmlFor="add-moto-btn"
												style={{
													paddingLeft: 5,
													fontSize: '11px',
													color: 'goldenrod',
												}}
											>
												adicionar moto
											</label>
										</div>
									);
								}}
							</FieldArray>
						) : null}
						<button type="submit">
							{transactionID ? 'Editar venda' : 'Registrar venda'}
						</button>

						<div>
							<p>
								Total:{' '}
								{toCurrency(getTotal(values.motorcycles))}
							</p>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}
